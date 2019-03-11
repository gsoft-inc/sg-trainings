import { createStore, applyMiddleware } from "redux";
import { rootReducers } from './reducers';
import { API_REQUEST, API_REQUEST_SUCCEEDED, API_REQUEST_FAILED } from "./actions";
import _ from "lodash";

const consoleLoggerMiddleware = store => next => action => {
    console.log(action);

    return next(action);
};

const mapToApiRequestMiddleware = store => next => action => {
    const { type, payload, meta = {} } = action;

    if (type !== API_REQUEST) {
        if (!_.isNil(meta.api)) {
            const apiRequest = {
                type: API_REQUEST,
                payload: payload,
                meta: {
                    ...meta,
                    api: {
                        ...meta.api
                    }
                }
            };
    
            store.dispatch(apiRequest);
        }
    }

    return next(action);
};

const requestMiddleware = store => next => async action => {
    if (action.type === API_REQUEST) {
        const { api } = action.meta;

        const response = await fetch(api.url, { method: api.method });

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

export const store = createStore(rootReducers, applyMiddleware(consoleLoggerMiddleware, mapToApiRequestMiddleware, requestMiddleware));