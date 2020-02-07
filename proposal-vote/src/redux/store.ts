import { createStore, applyMiddleware } from 'redux'
import { taquitoApp } from './reducers'
import thunk from 'redux-thunk';

export const store = createStore(taquitoApp, applyMiddleware(thunk))