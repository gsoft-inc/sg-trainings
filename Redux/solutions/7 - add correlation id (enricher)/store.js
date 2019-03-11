import { createStore, applyMiddleware } from "redux";
import { rootReducers } from './reducers';
import { API_REQUEST, API_REQUEST_SUCCEEDED, API_REQUEST_FAILED, API_REQUEST_SHOW_LOADING, API_REQUEST_HIDE_LOADING } from "./actions";
import _ from "lodash";
import uuid from "uuid/v4";

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
            store.dispatch({
                type: API_REQUEST_SHOW_LOADING
            });
        }
    }

    return next(action);
};

const addCorrelationIdMiddleware = store => next => action => {
    return next({
        ...action,
        correlationId: uuid()
    });
};

const requestMiddleware = store => next => async action => {
    if (action.type === API_REQUEST) {
        const { api } = action.meta;

        const response = await fetch(api.url, { method: api.method });

        if (response.ok) {
            const content = await response.json();

            store.dispatch({
                type: API_REQUEST_SUCCEEDED,
                payload: content
            });
            setTimeout(() => {
                store.dispatch({
                    type: API_REQUEST_HIDE_LOADING
                })
            }, 1000);
        } else {
            store.dispatch({
                type: API_REQUEST_FAILED,
                payload: {
                    status: response.status
                }
            });
            store.dispatch({
                type: API_REQUEST_HIDE_LOADING
            })
        }
    }

    return next(action);
};

export const store = createStore(rootReducers, applyMiddleware(addCorrelationIdMiddleware, consoleLoggerMiddleware, mapToApiRequestMiddleware, requestMiddleware));
