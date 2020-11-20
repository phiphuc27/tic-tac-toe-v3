import { combineReducers } from 'redux';
import game from './game';
import alert from './alert';
import auth from './auth';

export default combineReducers({ game, alert, auth });
