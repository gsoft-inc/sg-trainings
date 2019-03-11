export const selectCartItems = (state) => {
    return state.cartItems.map(x => {
        const item = state.availableItems.find(i => i.id === x);

        if(item) {
            return item;
        }
    })
}

export const selectCartAmount = (state) => {
    const cartItems = selectCartItems(state);

    let total = 0;
    cartItems.forEach(x => total += x.price);
    
    return total;
}