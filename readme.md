
### About Project

---

The project is created to understand the concept of Human in the loop using Langchain. Furthermore, there is small sample files added to understand MCP client and server.

Package `surbhu-mcp-server` is published in NPM registry. One can run `npx surbhu-mcp-server` and test in local.

## Understanding Human in the loop agent

- The user can ask any queries related to sample emails added (data/emails.js). If user asks anything related to refund, approval is needed. If approved, then only it will be processed.

- Groq is used as LLM model.

## Features in MCP Server

- Add to number using Addnumber tool
- Multpiple numbers with doubling the result using multiple
- Classification of customer inputs text as postive, negative or feedback.

Note: Its just test tools created. We can add more features with authentication.
