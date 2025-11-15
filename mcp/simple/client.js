import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverPath = path.join(__dirname, "server.mjs");

console.log("serverPath:", serverPath);

const serverProcess = spawn(process.execPath, [serverPath], {
  stdio: ["pipe", "pipe", "pipe"],
});

const transport = new StdioClientTransport({
  input: serverProcess.stdout,
  output: serverProcess.stdin,
});

async function main() {
  const client = new Client({
    name: "my-mcp-client",
    version: "1.0.0",
  });

  await client.connect(transport);

  console.log("✅ Connected to MCP server!");

  const result = await client.callTool("hello", { name: "Suraj" });
  console.log("📩 Result from MCP:", result);

  serverProcess.kill();
}

main();
