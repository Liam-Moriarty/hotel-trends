import { useState, useRef, useEffect } from 'react'
import { trpc } from '@/lib/trpc'

export interface ChatMessage {
  role: 'user' | 'bot'
  text: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  input: string
  setInput: (value: string) => void
  isPending: boolean
  messagesEndRef: React.RefObject<HTMLDivElement>
  handleSend: (e?: React.FormEvent) => Promise<void>
  handleReset: () => void
}

// Named constants — change these in one place rather than hunting the component
const CHAT_STORAGE_KEY = 'chat_history'
const WELCOME_MESSAGE = 'Hello! I am your AI assistant. How can I help you today?'
const ERROR_MESSAGE = 'Sorry, I encountered an error connecting to the AI.'
// Cap the context window sent to the API: prevents unbounded token growth
// as conversations get longer. Keeps the last N user+bot turn pairs.
const MAX_HISTORY_TURNS = 10

export function useChat(hotelId: string): UseChatReturn {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY)
      return saved ? (JSON.parse(saved) as ChatMessage[]) : [{ role: 'bot', text: WELCOME_MESSAGE }]
    } catch {
      // Corrupted localStorage entry — start fresh
      return [{ role: 'bot', text: WELCOME_MESSAGE }]
    }
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const askMutation = trpc.dashboard.ask.useMutation()

  // Persist messages on every change
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])

    // Convert internal message format to the shape the API expects (Gemini-style history).
    // Trim to the last MAX_HISTORY_TURNS messages before sending.
    const history = messages.slice(-MAX_HISTORY_TURNS).map(msg => ({
      role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
      parts: [{ text: msg.text }],
    }))

    try {
      const response = await askMutation.mutateAsync({
        hotelId,
        question: userMessage,
        history,
      })
      setMessages(prev => [...prev, { role: 'bot', text: response.answer }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: ERROR_MESSAGE }])
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      localStorage.removeItem(CHAT_STORAGE_KEY)
      setMessages([{ role: 'bot', text: WELCOME_MESSAGE }])
    }
  }

  return {
    messages,
    input,
    setInput,
    isPending: askMutation.isPending,
    messagesEndRef,
    handleSend,
    handleReset,
  }
}
