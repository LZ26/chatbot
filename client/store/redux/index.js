import { combineReducers } from 'redux';
import chats from './chats';
const appReducer = combineReducers({ chats });
export default appReducer;
