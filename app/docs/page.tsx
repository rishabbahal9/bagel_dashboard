export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-10 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Plugin & Marketplace Docs</h1>
      <p className="text-gray-400 mb-10">
        How to install the Bagel Incident Simulator plugin in Claude Code.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-white">Installation</h2>
        <div className="bg-gray-900 rounded-xl p-5 space-y-3">
          <pre className="bg-gray-800 rounded-lg p-4 text-sm text-green-400 overflow-auto">
{`/plugin marketplace add rishabbahal9/bagel-plugin-marketplace
/plugin install bagel-incidents-plugin@bagel-plugin-marketplace`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">Repositories</h2>
        <div className="bg-gray-900 rounded-xl p-5 space-y-3">
          {[
            { label: "Plugin Marketplace", url: "https://github.com/rishabbahal9/bagel-plugin-marketplace" },
            { label: "Bagel Incidents Plugin", url: "https://github.com/rishabbahal9/bagel-incidents-plugin" },
          ].map(({ label, url }) => (
            <div key={url} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
              <span className="text-sm text-gray-300">{label}</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 font-mono transition"
              >
                {url.replace("https://github.com/", "github.com/")}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
