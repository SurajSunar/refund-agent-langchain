import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { ChatOllama } from "@langchain/ollama";

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

export { llmGoogle, llmOllama, llmGroq };
