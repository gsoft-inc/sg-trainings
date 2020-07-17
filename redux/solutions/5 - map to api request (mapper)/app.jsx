import React, { Component } from 'react';
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

import { addItemToCart, clearAllItems, removeCartItem, getItems } from './actions';


// ********************************************** //
// ******************* CART ********************* //
// ********************************************** //

function CartItem({id, name, price}) {

  function removeItem(event) {
    dispatch(removeCartItem(id, price));
  }

  return (
    <li key={id}>{name} - {price}$ <button onClick={removeItem}>Remove</button></li>
  );
}

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems);
  const cartAmount = useSelector(state => state.cartAmount);

  function clearAll(event) {
    event.stopPropagation();

    dispatch(clearAllItems());
  }
  
  return (
    <>
      <p>Your Cart (<span>{cartAmount}$</span>)</p>
      <button onClick={clearAll}>Clear All</button>
      <ul>
        {
          cartItems.map(item => {
            return <CartItem key={item.id} item={item} dispatch={dispatch} />
          })
        }
      </ul>
    </>
  );
}


// ********************************************** //
// ******************* ITEM ********************* //
// ********************************************** //

function AvailableItem({name,price}) {
  const dispatch = useDispatch();

  function addItem(event) {
    event.stopPropagation();

    dispatch(addItemToCart(uuid(), name, parseInt(price)));
  }

  return (
    <li>{name} - {price}$ <button onClick={addItem}>Add item to cart</button></li>
  );
}

function AvailableItems() {

  const dispatch = useDispatch();
  const availableItems = useSelector(state => state.availableItems);

  if (availableItems.length === 0) {
    dispatch(getItems());
  }

  return (
    <>
      <p>Available Items ({availableItems.length})</p>
      <ul>
        {
          availableItems.map(item => {
            return <AvailableItem key={item.id} { ...item } dispatch={dispatch} />
          })
        }
      </ul>
    </>
  );
}

// ********************************************* //
// ******************* APP ********************* //
// ********************************************* //

export class App extends Component {
  render() {
    return (
      <div>
        <p>Welcome to Amazon!</p>
        <img alt="amazon" src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2016/02/AMAZON-1200x537.png" />
        <br />
        <Cart />
        <AvailableItems />
      </div>
    );
  }
}