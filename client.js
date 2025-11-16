import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function runClient() {
  const client = new Client({
    name: "my-mcp-client",
    version: "0.1.0",
  });

  // Correct way: pass a URL object
  const transport = new StreamableHTTPClientTransport(
    new URL("http://localhost:4000/mcp"),
    {
      // optional params
      sessionId: "my-session-id-123",
      // you can also pass fetch init if needed
      requestInit: {
        headers: {
          "Content-Type": "application/json",
          // other headers if needed
        },
      },
    }
  );

  await client.connect(transport);

  // Now you can call tool, list, etc.
  const tools = await client.listTools();
  console.log("Tools:", tools.tools);

  const resp = await client.callTool({ name: "getTime", arguments: {} });
  console.log("getTime result:", resp.content);

  const resp2 = await client.callTool({
    name: "addNumbers",
    arguments: { a: 5, b: 3 },
  });
  console.log("addNumbers result:", resp2.content);

  await client.close();
}

runClient().catch((err) => {
  console.error("Client error:", err);
});
