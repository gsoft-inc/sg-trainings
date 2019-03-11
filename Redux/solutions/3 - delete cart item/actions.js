export const ADD_ITEM = "ADD_ITEM";
export const CLEAR_ALL = "CLEAR_ALL";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

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