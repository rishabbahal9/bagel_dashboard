"use client";
import { useState } from "react";

const MCP_URL = process.env.NEXT_PUBLIC_MCP_URL ?? "http://localhost:3001";

export default function McpUrlPage() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(MCP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-10 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">MCP Server URL</h1>
      <p className="text-gray-400 mb-10">
        Use this URL to connect Claude Code to your Bagel MCP server.
      </p>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
          Your MCP Server URL
        </p>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-gray-800 rounded-lg px-4 py-3 text-green-400 text-lg font-mono tracking-wide">
            {MCP_URL}
          </code>
          <button
            onClick={copy}
            className="bg-gray-700 hover:bg-gray-600 transition px-4 py-3 rounded-lg text-sm font-medium shrink-0"
          >
            {copied ? "✅ Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-8 bg-gray-900 rounded-xl p-5 border border-gray-700">
        <p className="text-sm text-gray-400 mb-3">
          Add to your project&apos;s{" "}
          <code className="bg-gray-800 px-1 rounded">.mcp.json</code>:
        </p>
        <pre className="bg-gray-800 rounded-lg p-4 text-sm text-green-400 overflow-auto">{`{
  "mcpServers": {
    "bagel-production-context": {
      "type": "http",
      "url": "${MCP_URL}/mcp"
    }
  }
}`}</pre>
      </div>
    </main>
  );
}
