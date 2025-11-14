import readline from "node:readline/promises";
import * as z from "zod";
import { createAgent, humanInTheLoopMiddleware, tool } from "langchain";
import { ChatOllama } from "@langchain/ollama";
import { MAILS } from "./data/emails.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Command, MemorySaver } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";

const llmGoogle = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  temperature: 0,
  maxRetries: 2,
});

const llmOllama = new ChatOllama({
  model: "llama3.1:latest",
  temperature: 0,
  maxRetries: 2,
});

const llmGroq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxRetries: 2,
});

const getWeather = tool(({ city }) => `It's always sunny in ${city}!`, {
  name: "get_weather",
  description: "Get the weather for a given city",
  schema: z.object({
    city: z.string(),
  }),
});

const getEMails = tool(
  ({}) => {
    return JSON.stringify(MAILS);
  },
  {
    name: "get_emails",
    description: "get email from inbox",
  }
);

const refund = tool(
  ({ emails }) => {
    return "All refund processed successfully.";
  },
  {
    name: "refund",
    description: "Process the refund for given emails",
    schema: z.object({
      email: z.array(z.string()).describe("List of emails provided for refund"),
    }),
  }
);

const agent = createAgent({
  model: llmGroq,
  tools: [getEMails, refund],
  systemPrompt: `
   You are best AI assistant to analyse the emails and process for refund if there is any refund request in the email body.
    Tools:
    - get_emails: Check the emails list and sort of refund emails and process that only.
    - refund: Use this tool if there is any refund request.

    Logic:
    - Call get_emails tool only if user query is related to emails.
    - Analyse the emails from get_emails tool and check for refund request.
    - If there are any emails related to refund, call refund tool.

  `,
  middleware: [
    humanInTheLoopMiddleware({
      interruptOn: { refund: true },
      descriptionPrefix: "refund email approval",
    }),
  ],
  checkpointer: new MemorySaver(),
});

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let interrupts = [];

  while (true) {
    const query = await rl.question("You: ");

    if (query === "bye") break;

    if (!query) continue;

    const response = await agent.invoke(
      interrupts.length
        ? new Command({
            resume: {
              [interrupts?.[0]?.id]: {
                decisions: [{ type: query === "1" ? "approve" : "reject" }],
              },
            },
          })
        : {
            messages: [{ role: "user", content: query }],
          },
      {
        configurable: { thread_id: "1" },
      }
    );

    let output = "";

    interrupts = [];

    if (response.__interrupt__?.length) {
      const currentInterrupt = response.__interrupt__[0];
      interrupts.push(currentInterrupt);

      output +=
        currentInterrupt?.value?.actionRequests[0]?.description +
        "\n\nChoose: \n";

      output += currentInterrupt?.value?.reviewConfigs[0]?.allowedDecisions
        ?.map((key, index) => `${index + 1}. ${key}`)
        .join("\n");
    } else {
      output += response.messages?.[response.messages?.length - 1]?.content;
    }

    console.log(output);
  }

  rl.close();
}

main();
