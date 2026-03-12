import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc'

interface Message {
  role: 'user' | 'bot'
  text: string
}

export const FlowtingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! Ask me anything about your hotel data or insights.' },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Connect to our backend ragQuery via tRPC!
  const askMutation = trpc.dashboard.ask.useMutation()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])

    try {
      const response = await askMutation.mutateAsync({
        hotelId: 'PILOT_HOTEL_ID', // Hardcoded for Pilot Phase
        question: userMessage,
      })

      setMessages(prev => [...prev, { role: 'bot', text: response.answer }])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: 'Sorry, I encountered an error connecting to the AI.' },
      ])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-80 sm:w-96 mb-4 shadow-xl border-border flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-md font-medium flex items-center gap-2">
              <Bot size={18} />
              AI Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary/90 h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px] bg-muted/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User size={16} className="text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {askMutation.isPending && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-primary" />
                </div>
                <div className="rounded-lg px-3 py-2 max-w-[80%] text-sm bg-muted text-foreground flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 bg-background border-t">
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none border rounded-md focus:ring-1 focus:ring-primary"
                disabled={askMutation.isPending}
              />
              <Button type="submit" size="icon" disabled={askMutation.isPending || !input.trim()}>
                <Send size={16} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  )
}
