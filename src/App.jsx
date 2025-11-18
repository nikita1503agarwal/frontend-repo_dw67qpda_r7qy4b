import { useState } from 'react'
import Header from './components/Header'
import UploadPanel from './components/UploadPanel'
import ChatPanel from './components/ChatPanel'

function App() {
  const [doc, setDoc] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_0%,rgba(59,130,246,0.18),transparent),radial-gradient(600px_400px_at_80%_20%,rgba(99,102,241,0.16),transparent)]"/>
      <Header />

      <main id="app" className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Upload a PDF and chat with it</h1>
            <p className="text-blue-200/80">Turn dense documents into instant answers. Perfect for research papers, reports, manuals, and more.</p>
            <UploadPanel onUploaded={setDoc} />
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-blue-200/80 text-sm">Unlimited pages</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-blue-200/80 text-sm">Fast search</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-blue-200/80 text-sm">Private & secure</div>
            </div>
          </div>

          <div className="sticky top-8">
            {doc ? (
              <ChatPanel doc={doc} />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <div className="text-blue-200/80">Your chat will appear here once you upload a PDF.</div>
              </div>
            )}
          </div>
        </div>

        <section id="pricing" className="mt-16">
          <h2 className="text-white text-2xl font-semibold mb-4">Simple pricing</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-white font-semibold text-lg">Starter</div>
              <div className="text-3xl font-bold text-white mt-2">$9<span className="text-blue-200/70 text-sm">/mo</span></div>
              <ul className="mt-4 space-y-2 text-blue-200/80 text-sm list-disc list-inside">
                <li>5 documents</li>
                <li>Basic chat</li>
                <li>Email support</li>
              </ul>
              <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 backdrop-blur-md transition">Get started</button>
            </div>
            <div className="rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 ring-1 ring-inset ring-blue-400/20">
              <div className="text-white font-semibold text-lg">Pro</div>
              <div className="text-3xl font-bold text-white mt-2">$29<span className="text-blue-200/70 text-sm">/mo</span></div>
              <ul className="mt-4 space-y-2 text-blue-100 text-sm list-disc list-inside">
                <li>Unlimited documents</li>
                <li>Advanced reasoning</li>
                <li>Priority support</li>
              </ul>
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition">Upgrade</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-8 text-center text-blue-200/70 text-sm">© {new Date().getFullYear()} DocChat AI</footer>
    </div>
  )
}

export default App
