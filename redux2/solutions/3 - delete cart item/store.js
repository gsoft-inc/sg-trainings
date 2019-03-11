import { createStore, applyMiddleware } from "redux";
import { rootReducers } from './reducers';

const consoleLoggerMiddleware = store => next => action => {
    console.log(action);

    return next(action);
};

export const store = createStore(rootReducers, applyMiddleware(consoleLoggerMiddleware));