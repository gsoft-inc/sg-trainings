import { createStore, applyMiddleware } from "redux";
import { rootReducers } from './reducers';
import { GET_ITEMS, API_REQUEST_SUCCEEDED, API_REQUEST_FAILED } from "./actions";

const consoleLoggerMiddleware = store => next => action => {
    console.log(action);

    return next(action);
};

const requestMiddleware = store => next => async action => {
    if (action.type === GET_ITEMS) {
        const response = await fetch("http://localhost:5678/api/amazon/items", { method: "GET" });

        if (response.ok) {
            store.dispatch({
                type: API_REQUEST_SUCCEEDED,
                payload: await response.json()
            });
        } else {
            store.dispatch({
                type: API_REQUEST_FAILED,
                payload: {
                    status: response.status
                }
            });
        }
    }

    return next(action);
};

export const store = createStore(rootReducers, applyMiddleware(consoleLoggerMiddleware, requestMiddleware));