import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 Welcome to NeoBite. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('menu') || lowerText.includes('food')) {
      return "You can view our full menu by clicking the 'Menu' link in the navigation bar. We have Starters, Mains, Desserts, and Drinks!";
    }
    if (lowerText.includes('order') || lowerText.includes('delivery')) {
      return "You can place an order directly through this website! Just add items to your cart and proceed to checkout. We offer Cash on Delivery, Card, and PayPal.";
    }
    if (lowerText.includes('book') || lowerText.includes('reservation') || lowerText.includes('table')) {
      return "To book a table, please scroll down to the 'Book a Table' section or click the 'Book Now' button.";
    }
    if (lowerText.includes('contact') || lowerText.includes('location') || lowerText.includes('where')) {
      return "We are located at 123 Culinary Avenue, Foodie City. You can reach us at (555) 123-4567.";
    }
    if (lowerText.includes('time') || lowerText.includes('open') || lowerText.includes('hours')) {
      return "We are open Monday-Sunday from 11:00 AM to 11:00 PM.";
    }
    if (lowerText.includes('payment') || lowerText.includes('pay')) {
        return "We accept Cash on Delivery, Credit/Debit Cards (via Stripe), and PayPal.";
    }
    
    return "I'm not sure I understand. You can ask me about our menu, ordering, reservations, location, or opening hours!";
  };

  return (
    <>
      {/* Chat Trigger Button */}
      {!isOpen && (
        <motion.button
          className="chatbot-trigger"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-title">
                <span className="status-dot"></span>
                <h3>NeoBot</h3>
              </div>
              <div className="chatbot-controls">
                <button onClick={() => setIsMinimized(!isMinimized)}>
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="chatbot-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                      <div className="message-content">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form className="chatbot-input" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button type="submit" disabled={!inputText.trim()}>
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
