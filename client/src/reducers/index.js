import { combineReducers } from 'redux';
import game from './game';
import alert from './alert';

export default combineReducers({ game, alert });
