import { ADD_ITEM, CLEAR_ALL, REMOVE_CART_ITEM, API_REQUEST_SUCCEEDED, API_REQUEST_SHOW_LOADING, API_REQUEST_HIDE_LOADING } from "./actions";

const initialState = {
    cartAmount: 0,
    cartItems: [],
    availableItems: [],
    isLoading: false
}

export function rootReducers(state = initialState, { type, payload }) {
    switch(type) {
        case ADD_ITEM:
            return {
                ...state,
                cartAmount: state.cartAmount + payload.price,
                cartItems: [...state.cartItems, { id: payload.id, name: payload.name, price: payload.price }]
            };
        case CLEAR_ALL:
            return {
                ...state,
                cartAmount: 0,
                cartItems : []
            }
        case REMOVE_CART_ITEM:
            const index = state.cartItems.findIndex(x => x.id === payload.id);
            return {
                ...state,
                cartAmount: state.cartAmount - payload.price,
                cartItems: [
                    ...state.cartItems.slice(0, index),
                    ...state.cartItems.slice(index + 1)
                ]
            }
        case API_REQUEST_SUCCEEDED:
            return {
                ...state,
                availableItems: payload
            }
        case API_REQUEST_SHOW_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case API_REQUEST_HIDE_LOADING:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}