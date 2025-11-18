import { Sparkles, FileText, MessageSquare } from 'lucide-react'

function Header() {
  return (
    <header className="relative z-10 py-6">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold tracking-tight text-xl">DocChat AI</div>
            <div className="text-blue-200/70 text-xs">Chat with your PDFs</div>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <a href="#features" className="text-blue-200/80 hover:text-white transition-colors text-sm">Features</a>
          <a href="#pricing" className="text-blue-200/80 hover:text-white transition-colors text-sm">Pricing</a>
          <a href="/test" className="text-blue-200/80 hover:text-white transition-colors text-sm">Status</a>
          <a href="#app" className="ml-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg border border-white/20 backdrop-blur-md transition">Launch App</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
