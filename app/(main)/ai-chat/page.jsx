"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const scrollRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiText = data.message;

      // Typing effect
      let i = 0;
      setTypingMessage("");
      const interval = setInterval(() => {
        setTypingMessage((prev) => prev + aiText[i]);
        i++;
        if (i === aiText.length) {
          clearInterval(interval);
          setMessages((prev) => [
            ...prev,
            { sender: "assistant", message: aiText },
          ]);
          setTypingMessage("");
        }
      }, 20);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", message: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingMessage]);

  const ChatBubble = ({ sender, message }) => {
    const isUser = sender === "user";
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
        <div
          className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words shadow-md ${
            isUser
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
              : "bg-white/20 text-white backdrop-blur-md rounded-bl-none border border-white/30"
          }`}
        >
          {message}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div className="flex flex-col w-full max-w-xl h-[600px] bg-gradient-to-br from-purple-800 via-blue-800 to-purple-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 text-white p-4 text-center font-bold text-lg rounded-t-2xl shadow-md">
          AI Career Chatbot
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} sender={msg.sender} message={msg.message} />
          ))}
          {typingMessage && (
            <div className="flex justify-start my-1">
              <div className="max-w-xs md:max-w-md p-3 rounded-2xl break-words shadow-md bg-white/20 text-white backdrop-blur-md rounded-bl-none border border-white/30">
                {typingMessage}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          )}
          <div ref={scrollRef}></div>
        </div>

        {/* Input */}
        <div className="flex border-t border-white/30 p-4 space-x-2 bg-transparent">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 border border-white/30 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/10 text-white placeholder-gray-300 transition-all duration-200"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 hover:bg-purple-600 text-white rounded-xl px-6 transition-all duration-200 shadow-lg"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
