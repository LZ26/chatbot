import React, { useState } from 'react';
import Chat from './Chat';

const Home = () => {
  return (
    <div>
      <h4 className="chatbot-header">Customer Care Bot (CCBot)</h4>
      <div>
        <Chat />
      </div>
    </div>
  );
};

export default Home;
