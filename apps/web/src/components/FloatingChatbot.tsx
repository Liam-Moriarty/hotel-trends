import { useState, useRef, useEffect } from 'react'
import { X, Send, User, Bot, Loader2, RotateCcw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'bot'
  text: string
}

export const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history')
    return saved
      ? JSON.parse(saved)
      : [{ role: 'bot', text: 'Hello! I am your AI assistant. How can I help you today?' }]
  })

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages))
  }, [messages])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const askMutation = trpc.dashboard.ask.useMutation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    const currentMessages = [...messages]
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])

    const history = currentMessages.map(msg => ({
      role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: msg.text }],
    }))

    try {
      const response = await askMutation.mutateAsync({
        hotelId: 'SAND01',
        question: userMessage,
        history,
      })
      setMessages(prev => [...prev, { role: 'bot', text: response.answer }])
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Sorry, I encountered an error connecting to the AI.' },
      ])
    }
  }

  const [shimmer, setShimmer] = useState(false)

  useEffect(() => {
    const fire = () => {
      setShimmer(true)
      setTimeout(() => setShimmer(false), 900) // longer than animation duration
    }
    fire() // fire once on mount
    const id = setInterval(fire, 6000)
    return () => clearInterval(id)
  }, [])

  const handleReset = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      const initial: Message[] = [
        { role: 'bot', text: 'Hello! I am your AI assistant. How can I help you today?' },
      ]
      setMessages(initial)
      localStorage.removeItem('chat_history')
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          className="w-80 sm:w-96 mb-4 rounded-xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5"
          style={{
            background: 'var(--surface-glass)',
            backdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid var(--border-default)',
            boxShadow: '0 20px 50px rgba(10,10,30,0.12)',
          }}
        >
          {/* Header — AI gradient */}
          <div
            className="py-3 px-4 flex flex-row items-center justify-between shrink-0"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Sparkles size={16} className="chatbot-header-sparkle" />
              AI Assistant
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset Chat"
                className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px]"
            style={{ background: 'var(--surface-container-high)' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-violet-muted)' }}
                  >
                    <Bot size={16} style={{ color: 'var(--accent-violet)' }} />
                  </div>
                )}
                <div
                  className="rounded-lg px-3 py-2 max-w-[80%] text-sm"
                  style={
                    msg.role === 'user'
                      ? { background: 'var(--accent-gradient)', color: 'white' }
                      : {
                          background: 'var(--surface-container)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-default)',
                        }
                  }
                >
                  {msg.role === 'bot' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-2">
                            <table className="w-full text-xs border-collapse">{children}</table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead style={{ background: 'var(--accent-cool-muted)' }}>
                            {children}
                          </thead>
                        ),
                        th: ({ children }) => (
                          <th className="px-2 py-1 text-left font-semibold border border-border/50 whitespace-nowrap">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="px-2 py-1 border border-border/50 whitespace-nowrap">
                            {children}
                          </td>
                        ),
                        tr: ({ children }) => <tr className="even:bg-muted/50">{children}</tr>,
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 mb-1 space-y-0.5">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 mb-1 space-y-0.5">{children}</ol>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        code: ({ children }) => (
                          <code className="bg-background/50 rounded px-1 py-0.5 text-xs font-mono">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
                {msg.role === 'user' && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-cool)' }}
                  >
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {askMutation.isPending && (
              <div className="flex gap-2 justify-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'var(--accent-violet-muted)' }}
                >
                  <Bot size={16} style={{ color: 'var(--accent-violet)' }} />
                </div>
                <div
                  className="rounded-lg px-3 py-2 max-w-[80%] text-sm flex items-center gap-2"
                  style={{ background: 'var(--surface-container)', color: 'var(--text-secondary)' }}
                >
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer input */}
          <div
            className="p-3"
            style={{
              background: 'var(--surface-container)',
              borderTop: '1px solid var(--border-default)',
            }}
          >
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 text-sm outline-none rounded-md"
                style={{
                  background: 'var(--surface-container-high)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
                onFocus={e => {
                  e.currentTarget.style.border = '1px solid var(--accent-cool)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-cool-muted)'
                }}
                onBlur={e => {
                  e.currentTarget.style.border = '1px solid var(--border-subtle)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                disabled={askMutation.isPending}
              />
              <Button type="submit" size="icon" disabled={askMutation.isPending || !input.trim()}>
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 text-white relative overflow-hidden${!isOpen ? ' fab-bounce' : ''}${!isOpen && shimmer ? ' fab-shimmer-active' : ''}`}
        style={{ background: 'var(--accent-gradient)' }}
      >
        <span className="fab-shimmer-1" />
        <span className="fab-shimmer-2" />
        {isOpen ? <X size={22} /> : <Sparkles size={22} className="chatbot-header-sparkle" />}
      </button>
    </div>
  )
}
