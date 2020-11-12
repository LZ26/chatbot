import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userMessage } from '../store/redux/chats';

const Chat = ({ chat, userMessage }) => {
  //handle user message
  const [message, setMessage] = useState('');

  //function that handles user submission
  const handleClick = async (ev) => {
    const code = ev.keyCode || ev.which;

    if (code === 13) {
      console.log(message);
      userMessage(message);
      setMessage('');
    }
  };
  console.log(localStorage);

  return (
    <div className="chat">
      <h1>Customer Care Chatbot (CCBot)</h1>
      {/*handle messages */}
      {chat.length === 0
        ? ''
        : chat.map((txt) => (
            <div key={txt.id} className={txt.type}>
              {txt.message}
            </div>
          ))}
      {/*input box */}
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

export default connect(mapStateToProps, { userMessage })(Chat);
