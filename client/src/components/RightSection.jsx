import React, { useState } from 'react';
import logo from "../assets/logo.png";
import SendIcon from '@mui/icons-material/Send';

const RightSection = () => {

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessage] = useState('');

  const sendMessage = async () => { };

  return (
    <section className='rightsection'>
      <div className='geminiversion'>
        <p className='textone'>Gemini Mama 2.O</p>
      </div>
      <div className='nochat'>
        <div className='sectionone'>
          <img src={logo} alt="logo" height={70} width={70} />
          <h1>How can I help you today</h1>
        </div>
      </div>
      <div className='bottomsection'>
        <div className='messagebar'>
          <input
            type="text"
            placeholder='Type something to interact with Gemini Mama 2.O'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <div onClick={sendMessage}>
            <SendIcon />
          </div>
        </div>
        <p>Gemini Mama 2.O can make mistakes. Consider checking important information</p>
      </div>
    </section>
  );
};

export default RightSection;