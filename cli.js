#!/usr/bin/env node

import { startServer } from "./mcp/simple/server.js"; // or wherever your server start logic is

startServer().catch((err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});
