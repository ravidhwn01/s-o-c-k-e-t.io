import { useState } from "react";
import './App.css';
import { nanoid } from 'nanoid'
import { io } from "socket.io-client";

// no dotenv
const socket = io.connect("http://localhost:5000");


function App() {
  const [messages, setMessages] = useState('');
  const [chat, setChat] = useState([]);

// sending a text
const sendChat = (e)=>{
  e.preventDefault();
  socket.emit('chat', {messages});
  setMessages('');
}


  return (
    <div className="App">
      <header className="App-header">
       <h1>baatain</h1>
       <form onSubmit={sendChat} >
          <input type="text" value={messages} onChange={(e) => setMessages(e.target.value)} />
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            socket.emit('chat', messages);
            setMessages('');
          }}>Send</button>

       </form>
      </header>
    </div>
  );
}

export default App;
