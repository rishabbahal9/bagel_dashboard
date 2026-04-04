"use client";
import { useState, useEffect } from "react";

const MCP_URL = process.env.NEXT_PUBLIC_MCP_URL ?? "http://localhost:3001";

interface IncidentState {
  active: boolean;
  service: string;
  cpu: number;
  errorRate: number;
  latency: number;
  errors500: number;
  status: string;
  message: string;
}

const INCIDENTS = [
  {
    label: "💥 CPU Spike",
    payload: {
      active: true,
      cpu: 94,
      errorRate: 0,
      latency: 180,
      errors500: 0,
      status: "warning",
      service: "checkout-api",
      message: "CPU spike detected",
    },
  },
  {
    label: "🔴 500 Errors Storm",
    payload: {
      active: true,
      cpu: 45,
      errorRate: 523,
      latency: 2400,
      errors500: 523,
      status: "critical",
      service: "checkout-api",
      message: "500 error storm",
    },
  },
  {
    label: "🐢 Latency Degradation",
    payload: {
      active: true,
      cpu: 30,
      errorRate: 12,
      latency: 8500,
      errors500: 12,
      status: "warning",
      service: "checkout-api",
      message: "High latency detected",
    },
  },
];

export default function Dashboard() {
  const [status, setStatus] = useState<IncidentState | null>(null);
  const [loading, setLoading] = useState("");

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${MCP_URL}/status`);
      const data: IncidentState = await res.json();
      setStatus(data);
    } catch {
      // server not reachable yet — stay silent
    }
  };

  // Auto-poll every 5 seconds
  useEffect(() => {
    fetchStatus();
    const id = setInterval(fetchStatus, 5000);
    return () => clearInterval(id);
  }, []);

  const trigger = async (incident: Partial<IncidentState>, label: string) => {
    setLoading(label);
    const res = await fetch(`${MCP_URL}/trigger-incident`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incident),
    });
    const data = await res.json();
    setStatus(data.state);
    setLoading("");
  };

  const resolve = async () => {
    setLoading("resolve");
    const res = await fetch(`${MCP_URL}/resolve-incident`, { method: "POST" });
    const data = await res.json();
    setStatus(data.state);
    setLoading("");
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-2">🚨 Production Incident Dashboard</h1>
      <p className="text-gray-400 mb-10">
        Trigger mock incidents → Claude Code diagnoses &amp; fixes
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {INCIDENTS.map((inc) => (
          <button
            key={inc.label}
            onClick={() => trigger(inc.payload, inc.label)}
            disabled={loading === inc.label}
            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 p-4 rounded-xl font-semibold text-lg transition"
          >
            {loading === inc.label ? "Triggering..." : inc.label}
          </button>
        ))}
      </div>

      <button
        onClick={resolve}
        disabled={loading === "resolve"}
        className="bg-green-600 hover:bg-green-500 disabled:opacity-50 px-8 py-3 rounded-xl font-semibold mb-10 transition"
      >
        ✅ Resolve All Incidents
      </button>

      {status ? (
        <div
          className={`rounded-xl p-6 ${
            status.active
              ? "bg-red-950 border border-red-500"
              : "bg-green-950 border border-green-500"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Current State</h2>
            <span className="text-xs text-gray-400">auto-refreshes every 5s</span>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "CPU", value: `${status.cpu}%`, warn: status.cpu > 80 },
              { label: "Latency", value: `${status.latency}ms`, warn: status.latency > 1000 },
              { label: "Error Rate", value: `${status.errorRate}/min`, warn: status.errorRate > 5 },
              { label: "500s", value: String(status.errors500), warn: status.errors500 > 0 },
            ].map((m) => (
              <div
                key={m.label}
                className={`rounded-lg p-3 text-center ${
                  m.warn ? "bg-red-900" : "bg-gray-800"
                }`}
              >
                <div className="text-xs text-gray-400 mb-1">{m.label}</div>
                <div className="text-lg font-bold">{m.value}</div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-300 mb-3">
            <span className="font-semibold">{status.service}</span> — {status.message}
          </p>
          <pre className="text-xs text-gray-400 overflow-auto">
            {JSON.stringify(status, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="rounded-xl p-6 bg-gray-900 border border-gray-700 text-gray-500">
          Connecting to MCP server at{" "}
          <code className="text-gray-400">{MCP_URL}</code>…
        </div>
      )}
    </main>
  );
}
