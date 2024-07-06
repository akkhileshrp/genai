import React, { useState } from 'react';
import logo from "../assets/logo.png";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";

const RightSection = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // Hide the initial greeting
    setShowGreeting(false);

    // Add the user's message to the messages state
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: message }]);
    
    try {
      const response = await axios.post('http://localhost:5000/generate', {
        prompt: message
      });

      // Add the API response to the messages state
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: response.data }]);
      
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error appropriately
    }

    // Clear the input field
    setMessage("");
  };

  return (
    <section className='rightsection'>
      <div className='geminiversion'>
        <p className='textone version'>Gemini Mama 2.O</p>
      </div>
      <div className='nochat'>
        <div className='sectionone'>
          {showGreeting && <img src={logo} alt="logo" height={70} width={70} style={{ borderRadius: "50%" }} />}
          {showGreeting && <h1>How can I help you today</h1>}
        </div>
        <div className='chatbox'>
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='bottomsection'>
        <div className='messagebar'>
          <input
            type="text"
            name='message'
            placeholder='Type something to interact with Gemini Mama 2.O'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <div onClick={handleSendMessage}>
            <SendIcon className='send' style={{ fontSize: "28px", cursor: "pointer" }} />
          </div>
        </div>
        <div className='footer'>
          <p>Gemini Mama 2.O can make mistakes. Consider checking important information</p>
        </div>
      </div>
    </section>
  );
};

export default RightSection;
