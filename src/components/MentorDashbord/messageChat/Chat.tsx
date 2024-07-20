"use client";
import { backend_url } from "@/components/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CreateGroupChat from "./CreateGroupChat";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const socket = io(`${backend_url}`);

interface Person {
  id: number;
  name: string;
  avatar: string;
  message: Message[];
  unreadMessages: number;
}
interface Message {
  id: number;
  sender: string;
  receiver: string;
  text: string;
  time: string;
}

const Chat = () => {
  const [contacts, setContacts] = useState<Person[]>([]);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [showCreateGroupChat, setShowCreateGroupChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const selectedPerson = contacts.find(
    (person) => person.id === selectedContact
  );

  const user = useSelector((state: RootState) => state.users.user);
  const id = user?._id;

  const handleOpenModal = () => setShowCreateGroupChat(true);
  const handleCloseModal = () => setShowCreateGroupChat(false);

  useEffect(() => {
    // Fetch contacts from the backend
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/v1/users`);
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact !== null) {
      const selectedPerson = contacts.find(
        (person) => person.id === selectedContact
      );
      if (selectedPerson) {
        setMessages(selectedPerson.message);
      }
    }
  }, [selectedContact, contacts]);

  useEffect(() => {
    if (selectedContact !== null) {
      socket.emit("joinRoom", selectedContact);
    }

    socket.on("newMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [selectedContact]);

  const selectContact = (id: number) => {
    setSelectedContact(id);
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          unreadMessages: 0,
        };
      }
      return contact;
    });
    setContacts(updatedContacts);
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    if (selectedContact) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `${backend_url}/api/v1/messages/${selectedContact}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
      socket.emit("joinChat", selectedContact);

      socket.on("messageReceived", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Cleanup function to leave the chat room on unmount
      return () => {
        socket.emit("leaveChat", selectedContact);
        socket.off("messageReceived");
      };
    }
  }, [selectedContact]);

  const sendorId = user?._id;
  const receiverId = selectedPerson?.id;
  console.log(sendorId);
  console.log(selectContact);

  // Function to send a message
  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`${backend_url}/api/v1/messages`, {
        chatId: selectedContact,
        message: newMessage,
        sendorId: sendorId,
        receiverId: receiverId,
      });

      // Update the local state with the new message
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      try {
        const response = await axios.get(`${backend_url}/api/v1/users/`, {
          params: { query },
        });
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    } else {
      // Refetch contacts if the search query is cleared
      const response = await axios.get(`${backend_url}/api/v1/users`);
      setContacts(response.data);
    }
  };

  return (
    <section className="flex h-[calc(100vh-64px)]">
      {/* for desktop */}
      <section className="hidden md:flex">
        <aside className="md:w-1/3 hidden md:flex md:flex-col space-y-5 p-4">
          <div className="flex space-x-2 items-center">
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
          <div className="flex justify-end items-center">
            <Button onClick={handleOpenModal}>create group chat</Button>
          </div>
          {showCreateGroupChat && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <CreateGroupChat handleCloseModal={handleCloseModal} />
              </div>
            </div>
          )}
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search "
                value={searchQuery}
                onChange={handleSearch}
                required
              />
            </div>
          </form>
          <Tabs defaultValue="private" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="private">Private Chat</TabsTrigger>
              <TabsTrigger value="group">Group Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="private">
              <ul className="space-y-2">
                {contacts.map((contact) => (
                  <li
                    key={contact.id}
                    className={`p-4 border rounded-lg shadow-sm flex items-center justify-between cursor-pointer ${
                      selectedContact === contact.id
                        ? "bg-blue-100"
                        : "bg-white"
                    }`}
                    onClick={() => selectContact(contact.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        className="w-12 h-12 rounded-full"
                        src={contact.avatar}
                        alt={`${contact.name}'s avatar`}
                        width={40}
                        height={40}
                      />
                      <div>
                        <h3 className="text-gray-900">{contact.name}</h3>
                        {contact.unreadMessages > 0 && (
                          <span className="text-sm text-red-500">
                            {contact.unreadMessages} unread messages
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="group">
              <ul className="space-y-2">
                {contacts.map((contact) => (
                  <li
                    key={contact.id}
                    className={`p-4 border rounded-lg shadow-sm flex items-center justify-between cursor-pointer ${
                      selectedContact === contact.id
                        ? "bg-blue-100"
                        : "bg-white"
                    }`}
                    onClick={() => selectContact(contact.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        className="w-12 h-12 rounded-full"
                        src={contact.avatar}
                        alt={`${contact.name}'s avatar`}
                        width={40}
                        height={40}
                      />
                      <div>
                        <h3 className="text-gray-900">{contact.name}</h3>
                        {contact.unreadMessages > 0 && (
                          <span className="text-sm text-red-500">
                            {contact.unreadMessages} unread messages
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </aside>
      </section>

      {/* for mobile */}
      <section className="md:hidden flex flex-col h-full">
        {isClicked ? (
          <>
            <div className="flex items-center justify-between bg-blue-500 p-4">
              <button
                className="text-white"
                onClick={() => setIsClicked(!isClicked)}
              >
                Back
              </button>
              {selectedPerson && (
                <div className="flex items-center space-x-3">
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={selectedPerson.avatar}
                    alt={`${selectedPerson.name}'s avatar`}
                    width={32}
                    height={32}
                  />
                  <h3 className="text-white">{selectedPerson.name}</h3>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages && messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message.id} className="mb-4">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <p className="text-sm text-gray-600">{message.text}</p>
                      <p className="text-sm text-gray-600">{message.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>
            <div className="p-4">
              <Input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full mb-2"
              />
              <Button
                onClick={handleSendMessage}
                className="w-full"
                //icon={<SendHorizontal size={20} />}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <aside className="flex flex-col space-y-5 p-4">
            <div className="flex space-x-2 items-center">
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
            <div className="flex justify-end items-center">
              <Button onClick={handleOpenModal}>create group chat</Button>
            </div>
            {showCreateGroupChat && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                  <CreateGroupChat handleCloseModal={handleCloseModal} />
                </div>
              </div>
            )}
            <form className="max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search "
                  value={searchQuery}
                  onChange={handleSearch}
                  required
                />
              </div>
            </form>
            <Tabs defaultValue="private" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="private">Private Chat</TabsTrigger>
                <TabsTrigger value="group">Group Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="private">
                <ul className="space-y-2">
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className={`p-4 border rounded-lg shadow-sm flex items-center justify-between cursor-pointer ${
                        selectedContact === contact.id
                          ? "bg-blue-100"
                          : "bg-white"
                      }`}
                      onClick={() => selectContact(contact.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          className="w-12 h-12 rounded-full"
                          src={contact.avatar}
                          alt={`${contact.name}'s avatar`}
                          width={40}
                          height={40}
                        />
                        <div>
                          <h3 className="text-gray-900">{contact.name}</h3>
                          {contact.unreadMessages > 0 && (
                            <span className="text-sm text-red-500">
                              {contact.unreadMessages} unread messages
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="group">
                <ul className="space-y-2">
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className={`p-4 border rounded-lg shadow-sm flex items-center justify-between cursor-pointer ${
                        selectedContact === contact.id
                          ? "bg-blue-100"
                          : "bg-white"
                      }`}
                      onClick={() => selectContact(contact.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          className="w-12 h-12 rounded-full"
                          src={contact.avatar}
                          alt={`${contact.name}'s avatar`}
                          width={40}
                          height={40}
                        />
                        <div>
                          <h3 className="text-gray-900">{contact.name}</h3>
                          {contact.unreadMessages > 0 && (
                            <span className="text-sm text-red-500">
                              {contact.unreadMessages} unread messages
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </aside>
        )}
      </section>
    </section>
  );
};

export default Chat;
