import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import imageReducer from './imageReducer';

export default combineReducers({
    auth: authReducer,
    alert: alertReducer,
    image: imageReducer,

});