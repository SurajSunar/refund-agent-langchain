import * as z from "zod";
import { createAgent, humanInTheLoopMiddleware, tool } from "langchain";
import { ChatOllama } from "@langchain/ollama";
import { MAILS } from "./data/emails.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

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
  model: llmOllama,
  tools: [getEMails, refund],
  systemPrompt: `
   You are best AI assistant to analyse the emails and process for refund if there is any refund request in the email body.
    Tools:
    - get_emails: Check the emails list and sort of refund emails and process that only.
    - refund: Use this tool if there is any refund emails from get_emails tool.
  `,
  middleware: [
    humanInTheLoopMiddleware({
      interruptOn: { refund: true },
      descriptionPrefix: "refund email approval",
    }),
  ],
  checkpointer: new MemorySaver(),
});

console.log(
  await agent.invoke(
    {
      messages: [{ role: "user", content: "is there any refund request?" }],
    },
    {
      configurable: { thread_id: "1" },
    }
  )
);
