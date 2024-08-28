import { useState, useEffect, useRef } from "react";
import { MdPersonPin } from "react-icons/md";
import "./App.css";

const App = () => {
  const [Message, setMessage] = useState("");
  const [Messages, setMessages] = useState(["Connect to the server"]);
  const [ws, setWs] = useState(null);
  const [historyWs, setHistoryWs] = useState(null);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/ws");
    setWs(websocket);
    

    websocket.onopen = () => {
      setMessages((prevMessages) => [...prevMessages, "Connected to the server"]);
    };

    websocket.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };

    websocket.onclose = () => {
      setMessages((prevMessages) => [...prevMessages, "Disconnected from the server"]);
    };

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    if (ws && ws.readyState === WebSocket.OPEN && Message !== "") {
      setMessages((prevMessages) => [...prevMessages, Message]);
      ws.send(Message);
      setMessage("");
    } else {
      console.log("Invalid");
    }
  };

  const handleHistorySubmit = () => {
    const webHistorySocket = new WebSocket("ws://localhost:8000/history");
    setHistoryWs(webHistorySocket);
    
    webHistorySocket.onopen = () => {
      console.log("Connected to the server");
    };

    webHistorySocket.onmessage = (message) => {
      setHistory(JSON.parse(message.data));
      // console.log(JSON.parse(message.data));
    };

    webHistorySocket.onclose = () => {
      console.log("Disconnected from the server");
    };
    historyWs.close();
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 app">
      {/* Chat Box */}
      <div className="flex-1 flex flex-col p-4">
        <h1 className="bg-gray-800 p-4 text-xl font-semibold text-center my-2 rounded-lg">WebSocket Chat</h1>
        <div className="flex-1 overflow-auto bg-gray-800 p-2 px-4 rounded-lg border border-gray-700 mb-2">
          {Messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`p-2 px-4 max-w-xs rounded-lg ${index % 2 === 0 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              >
                <div className="flex items-center gap-1 mb-1">
                  <MdPersonPin className="text-xl" />
                  <span className="font-semibold">{index % 2 === 0 ? "Client" : "Server"}</span>
                </div>
                <span>{message}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Message"
            className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 px-4 rounded-lg hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
      {/* Message History */}
      <div className="w-1/3 bg-gray-900 p-4 border-l border-gray-700 flex flex-col">
        <h1 className="bg-gray-800 p-4 text-xl font-semibold text-center my-2 rounded-lg">Message History</h1>
        <div className="flex-1 overflow-auto bg-gray-800 p-2 rounded-lg border border-gray-600 mb-4">
          {history !== null ? (
            history.map((message, index) => (
              <div key={index} className="py-2 px-4 border-b border-gray-600">
                <span>{index + 1}. {message.message} 
                  {/* {message.reverse} */}
                  </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No history available</div>
          )}
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400"
          onClick={handleHistorySubmit}
        >
          Get History
        </button>
      </div>
    </div>
  );
};

export default App;
