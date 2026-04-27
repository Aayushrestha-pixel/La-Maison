import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

// TODO: move this to env var before going live
const CHAT_URL = 'http://localhost:8000/api/chat'

const INITIAL_MSG = {
  from: 'bot',
  text: "Hi! I'm Maison, your table assistant. Ask me about our menu, hours, or reservations.",
  id: 0,
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  var msgId = useRef(1)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg = { from: 'user', text, id: msgId.current++ }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      // backend returns 200 even for unknown questions so we always parse
      const data = await res.json()
      console.log("here", data)

      setMessages(prev => [...prev, {
        from: 'bot',
        text: data.reply || "Sorry, I didn't catch that.",
        id: msgId.current++,
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        from: 'bot',
        text: "Hmm, something went wrong on my end. Try again?",
        id: msgId.current++,
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // quick reply chips — hardcoded for now, could come from backend later
  const quick_replies = ['Opening hours', 'Book a table', 'View menu', 'Location']

  const handleQuickReply = (text) => {
    setInput(text)
    // slight delay so user sees the chip selected before send
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'user', text, id: msgId.current++ }])
      setLoading(true)
      fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
        .then(r => r.json())
        .then(data => {
          setMessages(prev => [...prev, { from: 'bot', text: data.reply || "Sorry, I didn't get that.", id: msgId.current++ }])
        })
        .catch(() => {
          setMessages(prev => [...prev, { from: 'bot', text: "Connection issue, try again.", id: msgId.current++ }])
        })
        .finally(() => {
          setLoading(false)
          setInput('')
        })
    }, 80)
  }

  return (
    <div className="chatbot-root">
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">M</div>
            <div>
              <strong>Maison Assistant</strong>
              <span className="chat-status">Online</span>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-body">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.from}`}>
                {msg.from === 'bot' && <div className="msg-avatar">M</div>}
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot">
                <div className="msg-avatar">M</div>
                <div className="msg-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 && (
            <div className="quick-replies">
              {quick_replies.map(q => (
                <button key={q} className="quick-chip" onClick={() => handleQuickReply(q)}>{q}</button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="chat-send">
              ➤
            </button>
          </div>
        </div>
      )}

      <button className={`chat-bubble ${open ? 'active' : ''}`} onClick={() => setOpen(o => !o)}>
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
