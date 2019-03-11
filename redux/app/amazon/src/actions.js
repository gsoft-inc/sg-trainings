export const ADD_ITEM = "ADD_ITEM";

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

