// ITEMS

export const ADD_ITEM = "ADD_ITEM";
export const CLEAR_ALL = "CLEAR_ALL";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
export const GET_ITEMS = "GET_ITEMS";

export const addItemToCart = (id, name, price) => {
    return {
        type: ADD_ITEM,
        payload: {
            id,
            name,
            price
        }
    }
} 

export const clearAllItems = () => {
    return {
        type: CLEAR_ALL,
        payload: {}
    }
}

export const removeCartItem = (id, price) => {
    return {
        type: REMOVE_CART_ITEM,
        payload: {
            id,
            price
        }
    }
}

export function getItems() {
    return {
        type: GET_ITEMS,
        payload: {},
        meta: {
            api: {
                url: "http://localhost:5678/api/amazon/items",
                method: "GET"
            }
        }
    };
}

// API

export const API_REQUEST = "API_REQUEST";
export const API_REQUEST_SUCCEEDED = "API_REQUEST_SUCCEEDED";
export const API_REQUEST_FAILED = "API_REQUEST_FAILED";

