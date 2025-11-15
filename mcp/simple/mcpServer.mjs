import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function createMcpServer() {
  const server = new McpServer({
    name: "my-mcp-server",
    version: "1.0.0",
  });

  // Register tool
  server.registerTool(
    "hello",
    {
      title: "Say Hello",
      description: "Returns a greeting message",
      inputSchema: z.object({ name: z.string() }),
      outputSchema: z.object({ message: z.string() }),
    },
    async ({ name }) => {
      const message = `Hello ${name}! MCP server is working.`;
      return {
        content: [{ type: "text", text: message }],
        structuredContent: { message },
      };
    }
  );

  return server;
}
