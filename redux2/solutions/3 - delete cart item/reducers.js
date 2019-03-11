import { ADD_ITEM, CLEAR_ALL, REMOVE_CART_ITEM } from "./actions";

const initialState = {
    cartAmount: 0,
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
        default:
            return state;
    }
}