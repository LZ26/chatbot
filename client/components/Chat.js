import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { userMessage, sendMessage } from '../store/redux/chats';

const Chat = ({ chat, userMessage, sendMessage }) => {
  //handle user message
  const [message, setMessage] = useState('');
  const messageEnd = useRef(null);

  //function that handles user submission
  const scrollToBottom = () => {
    messageEnd.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [chat]);

  const handleClick = async (ev) => {
    const code = ev.keyCode || ev.which;

    if (code === 13) {
      console.log(message);
      userMessage(message);
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat">
      {/* <div>
        <h1>Customer Care Chatbot (CCBot)</h1>
      </div> */}
      <div className="chat-history">
        {chat.length === 0
          ? ''
          : chat.map((txt) => {
              return (
                <div key={txt.id} className={txt.type}>
                  {txt.message}
                </div>
              );
            })}
        <div className="scroller" ref={messageEnd}></div>
      </div>

      <input
        id="chatField"
        onChange={(ev) => setMessage(ev.target.value)}
        onKeyPress={handleClick}
        value={message}
      ></input>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chats.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
