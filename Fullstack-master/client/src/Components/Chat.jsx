// ChatApp.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ChatMessage = ({ content, sender }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`${isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          } p-3 rounded`}
      >
        {content}
      </div>
    </div>
  );
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesuser, setMessagesuser] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Update state with user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message, sender: "user" },
    ]);

    // Send the message to the server
    try {
      // Log the message being sent
      console.log("Sending message:", message);
      axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`


      // Make the POST request
      await axios.post("http://localhost:8000/contact-uss", {
        content: message,
      });

      // Log success message
      console.log("Message sent successfully!");
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error sending message:", error);
    }

    // Clear the input field
    setMessage("");
  };

  useEffect(() => {
    const getChatHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/getContactMessageadmin"
        );
        setMessages(response.data);
        console.log("issa", response.data);
      } catch (error) {
        console.error("Error getting chat history:", error);
      }
    };

    // Fetch chat history when the component mounts
    getChatHistory();
    getChatHistoryadmin();
  }, []);
  const getChatHistoryadmin = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `${Cookies.get("Token")}`


      const response = await axios.get(
        "http://localhost:8000/getContactMessageByuser"
      );
      setMessagesuser(response.data);
      console.log("issaa", response.data);
    } catch (error) {
      console.error("Error getting chat history:", error);
    }
  };

  // Run the effect only once

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Display user messages */}
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              content={msg.contact_message}
              sender={msg.sendertype}
            />
          ))}

        {/* Display admin messages */}
        {messagesuser &&
          messagesuser.map((msg, index) => (
            <ChatMessage
              key={index}
              content={msg.contact_message}
              sender={msg.sendertype}
            />
          ))}
      </div>
      <div className="p-4">
        {/* Chat input and send button */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ChatApp() {
  return (
    <div className="App">
      <Chat />
    </div>
  );
}
