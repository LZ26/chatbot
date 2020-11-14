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
  const date = new Date().toLocaleTimeString().split(':').slice(0, 2).join(':');

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="chat">
      <div className="box">
        <button className="chat-button" type="submit" onClick={refreshPage}>
          <strong>Disconnect</strong>
        </button>
      </div>
      <div className="chat-history">
        {chat.length === 0
          ? ''
          : chat.map((txt, index) => {
              const capitalized = txt.type[0].toUpperCase() + txt.type.slice(1);
              return (
                <div key={index} className={txt.type}>
                  {txt.message}
                  <br />
                  <div className="simple-box">
                    <span className="date">{date}</span>
                    <span className="nickname">{capitalized}</span>
                  </div>
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
