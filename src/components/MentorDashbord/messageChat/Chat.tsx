"use client";
import { backend_url } from "@/components/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const socket = io(`${backend_url}`);

interface Person {
  id: string;
  name: string;
  avatar: string;
  unreadMessages: number;
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    email: string;
  };
  receiver: string;
  message: string;
  chatId: string;
  createdAt: string;
}

const Chat = () => {
  const [contacts, setContacts] = useState<Person[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const user = useSelector((state: RootState) => state.users.user);
  const userId = user?._id;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/v1/users/get`);
        console.log("Fetched Contacts:", response.data);

        const mappedContacts: Person[] = response.data.map((contact: any) => ({
          id: contact._id,
          name: contact.fullName,
          avatar: contact.profileImage?.url || "/assets/profile.jpeg",
          unreadMessages: contact.no_review || 0,
        }));
        setContacts(mappedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || selectedContact === null) return;
    setNewMessage("");

    try {
      const response = await axios.post(`${backend_url}/api/v1/messages`, {
        chatId: selectedContact,
        message: newMessage,
        senderId: userId,
        receiverId: selectedContact,
      });

      console.log("Sent Message:", response.data);

      setMessages((prevMessages) => [...prevMessages, response.data]);
      socket.emit("sendMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  useEffect(() => {
    if (selectedContact && userId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${backend_url}/api/v1/messages/${selectedContact}`
          );
          console.log("Fetched Messages:", response.data);

          if (!Array.isArray(response.data)) {
            console.error(
              "Expected an array of messages but received:",
              response.data
            );
            return;
          }

          const userIdStr = String(userId);
          const selectedContactStr = String(selectedContact);

          const filteredMessages = response.data.filter((message: any) => {
            const senderId = message.sender ? String(message.sender._id) : null;
            const receiverId =
              typeof message.receiver === "string"
                ? String(message.receiver)
                : null;

            return (
              (senderId === userIdStr && receiverId === selectedContactStr) ||
              (senderId === selectedContactStr && receiverId === userIdStr)
            );
          });

          console.log("Filtered Messages:", filteredMessages);

          setMessages(filteredMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      socket.emit("joinChat", selectedContact);

      socket.on("messageReceived", (newMessage: any) => {
        console.log("New Message Received:", newMessage);

        const senderId = newMessage.sender
          ? String(newMessage.sender._id)
          : null;
        const receiverId =
          typeof newMessage.receiver === "string"
            ? String(newMessage.receiver)
            : null;

        if (
          (senderId === userId && receiverId === selectedContact) ||
          (senderId === selectedContact && receiverId === userId)
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      return () => {
        socket.emit("leaveChat", selectedContact);
        socket.off("messageReceived");
      };
    }
  }, [selectedContact, userId, handleSendMessage]);

  const selectContact = (id: string) => {
    setSelectedContact(id);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await axios.get(`${backend_url}/api/v1/users/get`, {
          params: { query },
        });

        const mappedContacts: Person[] = response.data.map((contact: any) => ({
          id: contact._id,
          name: contact.fullName,
          avatar: contact.profileImage?.url || "/default-avatar.png",
          unreadMessages: contact.no_review || 0,
        }));
        setContacts(mappedContacts);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      const response = await axios.get(`${backend_url}/api/v1/users/get`);
      const mappedContacts: Person[] = response.data.map((contact: any) => ({
        id: contact._id,
        name: contact.fullName,
        avatar: contact.profileImage?.url || "/default-avatar.png",
        unreadMessages: contact.no_review || 0,
      }));
      setContacts(mappedContacts);
    }
  };

  return (
    <section className="flex h-[calc(100vh-64px)]">
      {/* Desktop View */}
      <aside className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto">
        <div className="flex space-x-2 items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <h2 className="text-gray-700 text-xl">Mentorship Chatting</h2>
        </div>
        <form>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={searchQuery}
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 10.5a6.75 6.75 0 1 1 11.737 3.6l4.362 4.361a.75.75 0 0 1-1.06 1.06l-4.362-4.362a6.75 6.75 0 0 1-7.406-8.6z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form>
        <div className="mt-4">
          {contacts
            .filter((contact) =>
              contact.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((contact) => (
              <div
                key={contact.id}
                onClick={() => selectContact(contact.id)}
                className={`flex items-center p-2 cursor-pointer ${
                  selectedContact === contact.id ? "bg-blue-200" : ""
                }`}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={contact.avatar}
                    alt={contact.name}
                    layout="fill"
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{contact.name}</p>
                  {contact.unreadMessages > 0 && (
                    <span className="text-red-500 text-sm">
                      {contact.unreadMessages} unread messages
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      </aside>

      {/* Mobile View  */}
      <main className="w-2/3 flex flex-col">
        {selectedContact ? (
          <>
            <header className="p-4 border-b border-gray-300 flex items-center space-x-4">
              <Image
                src={
                  contacts.find((contact) => contact.id === selectedContact)
                    ?.avatar || "/default-avatar.png" // Default avatar
                }
                alt="Avatar"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h2 className="text-gray-700 text-xl">
                {contacts.find((contact) => contact.id === selectedContact)
                  ?.name || "Chat"}
              </h2>
            </header>
            <section className="flex-1 overflow-auto p-4 border-b border-gray-300">
              <div>
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-2 my-2 ${
                      message.sender._id === userId ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-4 py-2 rounded-lg ${
                        message.sender._id === userId
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <footer className="p-4 border-t border-gray-300">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-500 text-white font-bold"
                >
                  <SendHorizontal />
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">Select a contact to start chatting</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default Chat;
