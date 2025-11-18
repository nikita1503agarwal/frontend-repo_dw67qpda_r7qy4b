import { useState, useRef } from 'react'
import { FileUp, Loader2 } from 'lucide-react'

function UploadPanel({ onUploaded }) {
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleFiles = async (files) => {
    const file = files?.[0]
    if (!file) return
    setError('')
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file')
      return
    }
    const form = new FormData()
    form.append('file', file)
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/upload`, {
        method: 'POST',
        body: form
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      onUploaded(data)
    } catch (e) {
      setError(e.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`relative rounded-2xl border ${dragOver ? 'border-blue-400 bg-blue-500/5' : 'border-white/10 bg-white/5'} p-8 text-center transition`}
         onDragOver={(e)=>{e.preventDefault(); setDragOver(true)}}
         onDragLeave={() => setDragOver(false)}
         onDrop={(e)=>{e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files)}}>
      <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
        {loading ? <Loader2 className="h-8 w-8 text-white animate-spin"/> : <FileUp className="h-8 w-8 text-white"/>}
      </div>
      <h3 className="mt-6 text-white text-xl font-semibold">Drop your PDF here</h3>
      <p className="text-blue-200/80 text-sm mt-1">or click to browse</p>

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 backdrop-blur-md transition"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Choose File'}
      </button>
      <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e)=>handleFiles(e.target.files)} />

      {error && <p className="mt-4 text-red-300 text-sm">{error}</p>}
    </div>
  )
}

export default UploadPanel
