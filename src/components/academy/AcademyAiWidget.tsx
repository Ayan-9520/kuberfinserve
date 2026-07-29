import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AI_SUGGESTIONS, ACADEMY_APP } from '@/data/academy'
import { cn } from '@/utils/cn'

type Msg = { role: 'user' | 'assistant'; text: string }

function mockReply(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.includes('whatsapp') || p.includes('document')) {
    return 'Suggested WhatsApp message:\n\n"Hi {{name}}, sharing the exact document list for your file. Once uploaded, I will shortlist lenders that fit your income and obligations—no guesswork on max eligibility."\n\n(OpenAI API placeholder — wire OPENAI_API_KEY on backend to replace this draft.)'
  }
  if (p.includes('home loan') || p.includes('foir')) {
    return 'Home loan FOIR (in plain words): banks check how much of your monthly income is already going to EMIs. Higher existing EMIs mean lower room for a new home loan EMI. Always show realistic capacity before quoting a “max amount”.'
  }
  if (p.includes('lap')) {
    return 'Loan Against Property unlocks funds using owned property as security. Useful for business growth or consolidation when unsecured limits are tight. Always explain valuation, legal checks and LTV before promising amounts.'
  }
  if (p.includes('objection') || p.includes('rate')) {
    return 'Objection reply: “Advertised rates assume a profile. Your effective cost depends on income stability, obligations and property. I will compare 2–3 realistic lender fits on total cost—not just the headline rate.”'
  }
  return `Partner AI draft for: “${prompt}”\n\nUse this as a starting point, then personalise with customer name, city and product. This UI is production-ready; connect your OpenAI (or compatible) API endpoint to replace the placeholder responses.`
}

export function AcademyAiPanel({ embedded = false }: { embedded?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: 'I am your Kuber Partner AI Assistant. Ask for WhatsApp drafts, proposals, product explainers, objection handling or marketing captions.',
    },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }, { role: 'assistant', text: mockReply(trimmed) }])
    setInput('')
  }

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60',
        embedded ? 'min-h-[28rem]' : 'h-[min(32rem,70vh)] w-[min(100vw-1.5rem,24rem)]',
      )}
    >
      <div className="flex items-center gap-2 bg-gradient-to-r from-brand-800 to-brand-600 px-4 py-3 text-white">
        <Sparkles className="h-4 w-4" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Partner AI Assistant</p>
          <p className="truncate text-[11px] text-white/80">OpenAI architecture placeholder</p>
        </div>
        {!embedded && (
          <Link to={`${ACADEMY_APP}/ai-assistant`} className="text-[11px] font-semibold underline">
            Expand
          </Link>
        )}
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={cn(
              'max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm',
              m.role === 'user'
                ? 'ml-auto bg-brand-700 text-white'
                : 'bg-slate-100 text-slate-700',
            )}
          >
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-3 py-2">
        {AI_SUGGESTIONS.slice(0, embedded ? 6 : 4).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-800 hover:bg-brand-100"
          >
            {s}
          </button>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-slate-100 p-3"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything for your partner practice…"
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-brand-700 px-3 text-white hover:bg-brand-800"
          aria-label="Send"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

export function AcademyAiFloatingWidget() {
  const [open, setOpen] = useState(false)
  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-40 md:bottom-8 md:right-6">
      {open && (
        <div className="pointer-events-auto mb-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -right-2 -top-2 z-10 rounded-full bg-navy-900 p-1 text-white shadow"
              aria-label="Close AI"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <AcademyAiPanel />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-800 to-brand-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-900/30"
      >
        <MessageCircle className="h-4 w-4" />
        AI Assistant
      </button>
    </div>
  )
}
