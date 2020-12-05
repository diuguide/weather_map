import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    searchQuery: searchReducer,
    error: errorReducer,
    auth: authReducer
})