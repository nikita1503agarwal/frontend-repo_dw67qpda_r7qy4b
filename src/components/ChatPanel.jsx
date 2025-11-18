import { useEffect, useRef, useState } from 'react'
import { Send, Bot, User as UserIcon } from 'lucide-react'

function ChatPanel({ doc }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `You're all set! Ask anything about “${doc.filename}”.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef()

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const q = input.trim()
    setInput('')
    const newMessages = [...messages, { role: 'user', content: q }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doc_id: doc.doc_id, message: q, history: [] })
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.answer }])
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col h-[520px]">
      <div ref={listRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex items-start gap-3 ${m.role==='user' ? 'justify-end' : ''}`}>
            {m.role==='assistant' && (
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <Bot className="h-4 w-4 text-blue-300"/>
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-2 rounded-xl text-sm leading-relaxed ${m.role==='user' ? 'bg-blue-500 text-white' : 'bg-white/10 text-blue-50 border border-white/10'}`}>
              {m.content}
            </div>
            {m.role==='user' && (
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-blue-100"/>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-blue-200/80 text-sm">Thinking…</div>
        )}
      </div>
      <div className="border-t border-white/10 p-3 flex items-center gap-2 bg-slate-900/40">
        <textarea value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={onKey} rows={1} placeholder="Ask anything about your PDF..." className="flex-1 resize-none bg-slate-800/60 text-white placeholder:text-blue-200/60 rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/40"/>
        <button onClick={send} disabled={loading} className="h-10 w-10 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white flex items-center justify-center transition">
          <Send className="h-4 w-4"/>
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
