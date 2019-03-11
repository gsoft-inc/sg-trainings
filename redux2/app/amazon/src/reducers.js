import { ADD_ITEM } from "./actions";

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
        default:
            return state;
    }
}