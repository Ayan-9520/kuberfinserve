import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, X, Send, ExternalLink } from 'lucide-react'
import { CHAT_QUICK_ACTIONS, CHAT_WELCOME, getBotReplyWithState, type BotReply, type BotState } from '@/data/chatbot'
import { SITE } from '@/data/site'
import { submitContact } from '@/utils/leads'
import { cn } from '@/utils/cn'

interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  links?: BotReply['links']
}

function isExternal(path: string) {
  return path.startsWith('http')
}

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [botState, setBotState] = useState<BotState>({})
  const listRef = useRef<HTMLDivElement>(null)
  const leadSubmitRef = useRef<string | null>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'bot',
          text: CHAT_WELCOME.text,
          links: CHAT_WELCOME.links,
        },
      ])
    }
  }, [open, messages.length])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const addBotReply = (reply: BotReply) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `bot_${Date.now()}`,
        role: 'bot',
        text: reply.text,
        links: reply.links,
      },
    ])
    setTyping(false)
  }

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setMessages((prev) => [
      ...prev,
      { id: `user_${Date.now()}`, role: 'user', text: trimmed },
    ])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      const result = getBotReplyWithState(trimmed, botState)
      setBotState(result.state)
      addBotReply(result.reply)
    }, 600 + Math.random() * 400)
  }

  // Auto-submit lead when lead flow completes (step === 'done')
  useEffect(() => {
    const draft = botState.leadDraft
    if (!botState.leadMode || botState.leadStep !== 'done' || !draft) return
    if (!draft.name || !draft.phone || !draft.email) return

    const submissionKey = `${draft.phone}:${draft.email}:${draft.product ?? 'unknown'}`
    if (leadSubmitRef.current === submissionKey) return
    leadSubmitRef.current = submissionKey

    const loanTypeLabel =
      draft.product === 'home-loan'
        ? 'Home Loan'
        : draft.product === 'lap'
          ? 'Loan Against Property'
          : draft.product === 'personal-loan'
            ? 'Personal Loan'
            : draft.product === 'business-loan'
              ? 'Business Loan'
              : draft.product === 'working-capital'
                ? 'Working Capital'
                : draft.product === 'education-loan'
                ? 'Education Loan'
                : draft.product === 'machinery-loan'
                  ? 'Machinery Loan'
                  : draft.product === 'car-loan'
                    ? 'Auto Loan (New Car)'
                    : draft.product === 'insurance'
                      ? 'Insurance'
                      : draft.product === 'credit-card'
                        ? 'Credit Card'
                        : 'Home Loan'

    const messageParts = [
      draft.message ? `Message: ${draft.message}` : null,
      draft.employmentType ? `Employment: ${draft.employmentType}` : null,
      draft.monthlyIncome ? `Monthly income: ${draft.monthlyIncome}` : null,
      draft.amount ? `Required amount: ${draft.amount}` : null,
    ].filter(Boolean)

    ;(async () => {
      setTyping(true)
      const result = await submitContact(
        {
          name: draft.name!,
          phone: draft.phone!,
          email: draft.email!,
          city: draft.city,
          employmentType: draft.employmentType,
          loanType: loanTypeLabel,
          message: messageParts.join('\n'),
        },
        'chatbot:kubera',
      )

      setTyping(false)

      addBotReply({
        text: result.ok
          ? '✅ Submitted successfully. Our team will contact you shortly.'
          : `⚠️ Could not submit right now. Please WhatsApp us or try again.\n\nError: ${result.error ?? 'Unknown'}`,
        links: [
          ...(SITE.whatsapp ? [{ label: 'WhatsApp Chat', path: `https://wa.me/${SITE.whatsapp}` }] : []),
          { label: 'Contact Page', path: '/contact-us' },
        ],
      })

      // Reset lead mode for next conversation
      setBotState((s) => ({ ...s, leadMode: false, leadStep: null, leadDraft: {} }))
    })()
  }, [botState])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(520px,75vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-brand-900/20 sm:right-6"
            role="dialog"
            aria-label="KuberFinserve chat assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-brand-800 to-brand-600 px-4 py-3.5 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Bot className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold leading-tight">KUBERA</p>
                <p className="text-xs text-green-100">Online · Replies instantly</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-brand-50/50 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm',
                      msg.role === 'user'
                        ? 'rounded-br-md bg-brand-700 text-white'
                        : 'rounded-bl-md border border-gray-100 bg-white text-gray-800',
                    )}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.links.map((link) =>
                          link.path.startsWith('payload:') ? (
                            <button
                              key={link.path}
                              type="button"
                              onClick={() => sendMessage(link.path.replace(/^payload:/, ''))}
                              disabled={typing}
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                            >
                              {link.label}
                            </button>
                          ) :
                          isExternal(link.path) ? (
                            <a
                              key={link.path}
                              href={link.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-100"
                            >
                              {link.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-brand-700"
                            >
                              {link.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400 [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400 [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-3 py-2">
              {CHAT_QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => sendMessage(action.payload)}
                  disabled={typing}
                  className="shrink-0 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 hover:bg-brand-100 disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-gray-100 bg-white p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about loans, rates, documents..."
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-brand-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
                maxLength={300}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-600 text-white disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          'fixed bottom-6 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full shadow-xl sm:right-6',
          open
            ? 'bg-brand-900 text-white'
            : 'bg-gradient-to-br from-brand-700 to-brand-600 text-white shadow-brand-600/40',
        )}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        aria-expanded={open}
      >
        {open ? <X className="h-7 w-7" /> : <Bot className="h-7 w-7" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-brand-400" />
          </span>
        )}
      </motion.button>
    </>
  )
}
