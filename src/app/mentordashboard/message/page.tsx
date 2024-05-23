"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import io from "socket.io-client";

const socket = io("http://localhost:3001"); // Replace with your server URL

const Page = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "John" },
    { id: 2, text: "Hi John!", sender: "Alice" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Listen for new messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off("message");
    };
  }, []);

  const handleMessageSend = () => {
    // Emit the new message to the server
    socket.emit("message", { text: newMessage, sender: "You" });
    setNewMessage("");
  };

  return (
    <div className="text-[16px] flex flex-col space-y-6 my-20">
      <h1>Chatting Room</h1>
      <div>
        {/* Display messages */}
        {messages.map((message) => (
          <div key={message.id}>
            <p>
              <strong>{message.sender}:</strong> {message.text}
            </p>
          </div>
        ))}
      </div>
      {/* Message input */}
      <div className="flex space-x-5 items-center max-w-3xl">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleMessageSend} className="px-6">
          <SendHorizontal size={28} className="text-center" />
        </Button>
      </div>
    </div>
  );
};

export default Page;
