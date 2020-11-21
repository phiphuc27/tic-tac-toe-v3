import { combineReducers } from 'redux';
import game from './game';
import alert from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({ game, alert, auth, profile });
