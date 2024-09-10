import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './index.css';
const socket = io(`http://localhost:5000`);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Event listener for incoming messages
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-blue-600 text-white text-center py-3">
          <h1 className="text-xl font-semibold">Chat Room</h1>
        </header>
        <main className="p-4 flex flex-col space-y-4 h-80 overflow-y-auto">
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md shadow-sm">
                {msg}
              </li>
            ))}
          </ul>
        </main>
        <footer className="bg-gray-100 p-4 flex items-center space-x-2 border-t">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
