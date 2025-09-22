"use client"

import { useState } from "react"
import { IoChatbubbleEllipsesOutline, IoClose } from "react-icons/io5"

export default function Chatbox() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: "user", text: input }])
    setInput("")

    // giả lập bot trả lời
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "Long ăn cứt" }])
    }, 800)
  }

  return (
    <div className="fixed bottom-8 right-5 z-50">
      {/* Nút chat nổi */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:bg-primary-700 transition cursor-pointer"
        >
          <IoChatbubbleEllipsesOutline size={28} />
        </button>
      )}

      {/* Hộp chat */}
      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-primary text-white">
            <h2 className="font-semibold">Chat with us</h2>
            <button className="cursor-pointer" onClick={() => setOpen(false)}>
              <IoClose size={22} />
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "ml-auto bg-primary text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Ô nhập */}
          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
