import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store/index';

import Home from './components/Home';
import { newSession } from './store/redux/chats';
import axios from 'axios';

// if (localStorage.session) {
//   delete axios.defaults.headers.common['session_id'];
//   axios.defaults.headers.common['session_id'] = localStorage.session;
// } else {
//   delete axios.defaults.headers.common['session_id'];
// }

const App = () => {
  useEffect(() => {
    if (!localStorage.session) {
      store.dispatch(newSession());
    }
  });

  return (
    <Provider store={store}>
      <div className="container">
        <Home />
      </div>
    </Provider>
  );
};

export default App;
