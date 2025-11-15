#!/usr/bin/env node
import { createMcpServer } from "./mcpServer.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = createMcpServer();
const transport = new StdioServerTransport();
server.connect(transport);

// Use stderr for logs, stdout is reserved for MCP protocol
console.error("🚀 MCP Server running via STDIO");
