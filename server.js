// server.ts
import express from "express";
import { randomUUID } from "crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { error } from "console";

// 1. Define your server info
const serverInfo = {
  name: "example-mcp-server",
  version: "0.1.0",
};

// 2. Create MCP server
const server = new McpServer(serverInfo);

// 3. Define a “tool” (callable function) using Zod schema for arguments
server.tool(
  "getTime",
  {
    /* Zod schema for arguments */
  },
  z.object({}), // no args
  async () => {
    // Handler for tool
    console.log("==", new Date().toISOString());
    const now = new Date().toISOString();
    return {
      content: [{ type: "text", text: `Current time is: ${now}` }],
    };
  }
);

server.registerTool(
  "addNumbers",
  {
    title: "Add Numbers",
    description: "Adds two numbers",
    inputSchema: { a: z.number(), b: z.number() },
    outputSchema: { sum: z.number() },
  },
  async ({ a, b }) => {
    const sum = a + b;
    return {
      content: [{ type: "text", text: `Sum is ${sum}` }],
      structuredContent: { sum },
    };
  }
);

// 4. Define a “resource”
server.resource(
  "status",
  {
    /* no path parameters */
  },
  z.object({}), // no params
  async () => {
    // resource content
    return {
      contents: [
        {
          type: "text",
          text: "Server is healthy",
        },
      ],
    };
  }
);

// 5. Setup Express + HTTP transport
const app = express();

// store transports per session
const transports = {};

app.post("/mcp", async (req, res) => {
  const sessionId = req.headers["mcp-session-id"];

  let transport;
  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else {
    // new session
    transport = new StreamableHTTPServerTransport({
      post: (msg) => {
        // this function is used to send notifications back
        // but with HTTP streamable, it's handled inside transport
      },
    });
    transports[sessionId ?? randomUUID()] = transport;
    await server.connect(transport);
  }

  try {
    await transport.handleRequest(req, res);
  } catch (err) {
    console.error("MCP transport error:", err);
    res.status(500).send("Internal MCP error");
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`MCP server listening at http://localhost:${PORT}/mcp`);
});
