export const ADD_ITEM = "ADD_ITEM";
export const CLEAR_ALL = "CLEAR_ALL";

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