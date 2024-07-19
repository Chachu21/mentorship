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
const socket = io(`${backend_url}`);

const Persons = [
  {
    id: 0,
    name: "John",
    avatar: "/assets/hero.jpg",
    message: [
      {
        id: 0,
        sender: "Marry",
        receiver: "You",
        text: "Who are you?",
        time: "12:00 PM", // Add the time property
      },
    ],
    unreadMessages: 4,
  },
  {
    id: 1,
    name: "Jane",
    avatar: "/assets/hero.jpg",
    message: [
      {
        id: 0,
        sender: "Marry",
        receiver: "You",
        text: "i am fine and you? you are very good and very interesting person and you are very good and very interesting person and you are very good and very interesting person and you are very good and very interesting ",
        time: "12:30 PM", // Add the time property
      },
    ],
    unreadMessages: 23,
  },
  {
    id: 2,
    name: "Mary",
    avatar: "/assets/hero.jpg",
    message: [
      {
        id: 0,
        sender: "Marry",
        receiver: "You",
        text: "Who are you?",
        time: "1:00 PM", // Add the time property
      },
      {
        id: 1,
        sender: "You",
        receiver: "Mary",
        text: "i am fine and you? you are very good and very interesting person and you are very good and very interesting person and you are very good and very interesting person and you are very good and very interesting ",
        time: "1:15 PM", // Add the time property
      },
      {
        id: 2,
        sender: "Mary",
        receiver: "You",
        text: "It seems the issue persists even after adjusting the type. Let's ensure that the handleSendMessage function properly creates message objects with the required properties, including the receiver property. Here's how you can adjust the handleSendMessage function to include the receiver property: ",
        time: "1:30 PM", // Add the time property
      },
    ],
    unreadMessages: 10,
  },
];

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
  const [contacts, setContacts] = useState<Person[]>(Persons);
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const selectedPerson = Persons.find(
    (person) => person.id === selectedContact
  );
  const [messages, setMessages] = useState<Message[]>(
    selectedPerson ? selectedPerson.message : []
  );
  const [newMessage, setNewMessage] = useState<string>("");

  const [showCreateGroupChat, setShowCreateGroupChat] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleOpenModal = () => setShowCreateGroupChat(true);
  const handleCloseModal = () => setShowCreateGroupChat(false);

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

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact !== null) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        receiver: Persons[selectedContact].name,
        text: newMessage,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("sendMessage", { message, roomId: selectedContact });

      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
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
      setContacts(Persons);
    }
  };

  return (
    <section className="flex h-[calc(100vh-64px)]">
      {/* for desktop */}
      <section className="hiddden md:flex">
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
              <TabsTrigger value="private">Private</TabsTrigger>
            </TabsList>

            <TabsContent value="private">
              <div className="overflow-y-auto">
                {contacts.map((person) => (
                  <div
                    onClick={() => selectContact(person.id)}
                    key={person.id}
                    className={
                      "flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer " +
                      (person.id === selectedContact ? "bg-blue-300 px-2" : "")
                    }
                  >
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-full"
                      width={48}
                      height={48}
                    />
                    <div className="flex flex-col flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-gray-700 text-sm">{person.name}</h3>
                        <span className="text-gray-500 text-sm">
                          {person.message.length > 0 &&
                            person.message[person.message.length - 1].time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-500 flex-grow text-sm overflow-hidden line-clamp-1">
                          {person.message.length > 0
                            ? person.message[person.message.length - 1].text
                            : ""}
                        </div>

                        {person.unreadMessages > 0 && (
                          <div className="w-8 p-2 text-center rounded-full bg-slate-400 ml-auto">
                            <span className="">{person.unreadMessages}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </aside>
        <main className="md:w-2/3 bg-white hidden md:flex flex-col p-4">
          <div className="flex-grow overflow-y-auto p-3 bg-gray-100 rounded">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 m-1 max-w-xs rounded-lg ${
                    message.sender === "You"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-300 text-gray-700 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 mt-3">
            <Input
              type="text"
              placeholder="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" onClick={handleSendMessage}>
              <SendHorizontal />
            </Button>
          </div>
        </main>
      </section>
      {/* for mobile */}
      <section className="flex md:hidden w-full">
        <aside
          className={`md:hidden  space-y-5 py-4 transform ${
            isClicked ? "hidden" : "flex flex-col w-full"
          } `}
        >
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
          <div className="overflow-y-auto">
            {contacts.map((person) => (
              <div
                onClick={() => selectContact(person.id)}
                key={person.id}
                className={
                  "flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer " +
                  (person.id === selectedContact ? "bg-blue-300 px-2" : "")
                }
              >
                <Image
                  src={person.avatar}
                  alt={person.name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-gray-700 text-sm">{person.name}</h3>
                    <span className="text-gray-500 text-sm">
                      {person.message.length > 0 &&
                        person.message[person.message.length - 1].time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-500 flex-grow text-sm overflow-hidden line-clamp-1">
                      {person.message.length > 0
                        ? person.message[person.message.length - 1].text
                        : ""}
                    </div>

                    {person.unreadMessages > 0 && (
                      <div className="w-8 p-2 text-center rounded-full bg-slate-400 ml-auto">
                        <span className="">{person.unreadMessages}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main
          className={`md:hidden bg-white transform  ${
            isClicked ? "flex flex-col w-full" : "hidden"
          }`}
        >
          <div className="bg-white flex space-x-5 items-center md:hidden">
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>

            <div className="text-gray-700 text-sm">
              {selectedContact !== null ? (
                <div className="flex space-x-1 items-center">
                  <Image
                    src={Persons[selectedContact].avatar}
                    alt={Persons[selectedContact].name}
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <span>{Persons[selectedContact].name}</span>
                </div>
              ) : (
                "Select a contact"
              )}
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-3 bg-gray-100 rounded">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 m-1 max-w-xs rounded-lg ${
                    message.sender === "You"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-300 text-gray-700 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-3 mt-3">
            <Input
              type="text"
              placeholder="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" onClick={handleSendMessage}>
              <SendHorizontal />
            </Button>
          </div>
        </main>
      </section>
    </section>
  );
};

export default Chat;
