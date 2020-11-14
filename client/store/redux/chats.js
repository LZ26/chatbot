import axios from 'axios';

const INPUT_SUCCESS = 'INPUT_SUCCESS';
const INPUT_FAIL = 'INPUT_FAIL';
const SESSION_SUCCESS = 'SESSION_SUCCESS';
const SESSION_FAIL = 'SESSION_FAIL';
const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
const MESSAGE_FAIL = 'MESSAGE_FAIL';

//function that handles user message

export const userMessage = (message) => async (dispatch) => {
  try {
    dispatch({ type: INPUT_SUCCESS, payload: message });
  } catch (err) {
    dispatch({ type: INPUT_FAIL });
  }
};

//action that creates session - API

export const newSession = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/chats/session');

    dispatch({ type: SESSION_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: SESSION_FAIL });
  }
};

//sends message to chatbot - API

export const sendMessage = (message) => async (dispatch) => {
  try {
    const response = await axios.post('/api/chats/message', { input: message });
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: response.data.output.generic[0].text,
    });
  } catch (err) {
    dispatch({ type: MESSAGE_FAIL });
  }
};

//REDUCER

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  let { messages } = state;

  if (type === INPUT_SUCCESS) {
    messages = [...messages, { message: payload, type: 'user' }];
    return {
      ...state,
      messages,
    };
  }
  if (type === INPUT_FAIL) {
    return {
      ...state,
    };
  }

  if (type === SESSION_SUCCESS) {
    localStorage.setItem('session', payload.result.session_id);
    return {
      ...state,
    };
  }

  if (type === SESSION_FAIL) {
    return {
      ...state,
    };
  }

  if (type === MESSAGE_SUCCESS) {
    messages = [...messages, { message: payload, type: 'bot' }];
    return {
      ...state,
      messages,
    };
  }

  if (type === MESSAGE_FAIL) {
    return {
      ...state,
    };
  }

  return {
    ...state,
  };
};
