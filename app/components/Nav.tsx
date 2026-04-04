"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/mcp-url", label: "MCP URL" },
  { href: "/docs", label: "Docs" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-10 py-3 flex items-center gap-6">
      <span className="text-white font-bold text-lg mr-4">🥯 Bagel</span>
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition ${
              active
                ? "text-white border-b-2 border-white pb-0.5"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
