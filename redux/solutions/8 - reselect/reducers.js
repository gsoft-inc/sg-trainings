import { ADD_ITEM, CLEAR_ALL, REMOVE_CART_ITEM } from "./actions";

const initialState = {
    cartItems: [],
    availableItems: [
        { id: 1, name: "Dan Abramov - Autobiography", price: 10 },
        { id: 2, name: "Redux in Action", price: 5 },
        { id: 3, name: "Shin Megami Tensei: Strange Journey Redux", price: 1 }
    ]
}

export function rootReducers(state = initialState, { type, payload }) {
    switch(type) {
        case ADD_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems, payload.id]
            };
        case CLEAR_ALL:
            return {
                ...state,
                cartItems : []
            }
        case REMOVE_CART_ITEM:
            const index = state.cartItems.findIndex(x => x === payload.id);
            return {
                ...state,
                cartItems: [
                    ...state.cartItems.slice(0, index),
                    ...state.cartItems.slice(index + 1)
                ]
            }
        default:
            return state;
    }
}