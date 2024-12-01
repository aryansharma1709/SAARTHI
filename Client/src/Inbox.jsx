import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, push, onValue, getDatabase } from "firebase/database";
import app from "../firebase";

const Inbox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const auth = getAuth(app);
  const db = getDatabase(app);
  const searchQueryParams = new URLSearchParams(window.location.search);
  const chat = searchQueryParams.get("chat");
  const [isMentor, setIsMentor] = useState(false);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      sender: auth?.currentUser?.email || "monu123",
      receiver: chat || "aryansharma22@gla.ac.in",
      text: message,
      timestamp: Date.now(),
    });
    setMessage("");
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken === "mentor") {
      setIsMentor(true);
    }
    const id = localStorage.getItem("id");
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      let filteredMessages;
      if (userToken !== "mentor") {
        filteredMessages = data
          ? Object.keys(data)
              .map((key) => ({ id: key, ...data[key] }))
              .filter(
                (msg) =>
                  (msg.sender === auth.currentUser.email &&
                    msg.receiver === chat) ||
                  (msg.receiver === auth.currentUser.email &&
                    msg.sender === chat)
              )
          : [];
      } else {
        filteredMessages = data
          ? Object.keys(data)
              .map((key) => ({ id: key, ...data[key] }))
              .filter(
                (msg) =>
                  (msg.sender === id &&
                    msg.receiver === "aryansharma22@gla.ac.in") ||
                  (msg.receiver === id && msg.sender === "aryansharma22@gla.ac.in")
              )
          : [];
      }

      setMessages(filteredMessages);
    });
  }, [chat, auth?.currentUser?.email]);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4 mt-16">
      <header className="w-full max-w-3xl flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Inbox</h2>
      </header>
      <div className="flex flex-col w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                (isMentor && msg.sender === "monu123") ||
                (!isMentor && msg.sender === auth?.currentUser?.email)
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  (isMentor && msg.sender === "monu123") ||
                  (!isMentor && msg.sender === auth?.currentUser?.email)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="block text-sm font-semibold">
                  {msg.sender === auth?.currentUser?.email ? "Me" : msg.sender}
                </span>
                <span className="block">{msg.text}</span>
              </div>
            </div>
          ))}
        </div>
        <footer className="flex items-center p-4 border-t">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-100 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Inbox;
