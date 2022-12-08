import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { io } from "socket.io-client";
const userName = nanoid(4)
// no dotenv
const socket = io.connect("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState([]);

  // sending a text
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { messages , userName});

    setMessages("");
  };

  useEffect(() => {
    // listening
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Adhoori Baatain</h1>
        {chat.map((payload, index) => {
          return (<p key={index}>{payload}  <span> user: {userName}</span> </p>)
        })}
       
        <form onSubmit={sendChat}>
          <input
            type="text"
          name="chat"
            value={messages}
            placeholder="send message"
            onChange={(e) => setMessages(e.target.value)}
          />
          <button className="btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              console.log(messages);
              socket.emit("chat", messages);
              setMessages("");
            }}
          >
            Send
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
