import React, { Component } from 'react';
import { connect } from "react-redux"

import { addItemToCart, clearAllItems, removeCartItem } from './actions';
import { selectCartAmount, selectCartItems } from './selectors';


// ********************************************** //
// ******************* CART ********************* //
// ********************************************** //

function CartItem(props) {
  const { item } = props;

  function removeItem(event) {
    event.stopPropagation();

    props.dispatch(removeCartItem(item.id, item.price));
  }

  return (
    <li key={item.id}>{item.name} - {item.price}$ <button onClick={removeItem}>Remove</button></li>
  );
}

function Cart(props) {
  function clearAll(event) {
    event.stopPropagation();

    props.dispatch(clearAllItems());
  }

  return (
    <>
      <p>Your Cart (<span>{props.cartAmount}$</span>)</p>
      <ul>
        {
          props.cartItems.map(item => {
            return <CartItem key={item.id} item={item} dispatch={props.dispatch} />
          })
        }
      </ul>
      <button onClick={clearAll}>Clear All</button>
    </>
  );
}

export const ConnectedCart = connect(
  (state) => ({
    cartAmount: selectCartAmount(state),
    cartItems: selectCartItems(state)
  }),
  null
)(Cart);


// ********************************************** //
// ******************* ITEM ********************* //
// ********************************************** //

function AvailableItem(props) {
  function addItem(event) {
    event.stopPropagation();

    props.dispatch(addItemToCart(props.id));
  }

  return (
    <li>{props.name} - {props.price}$ <button onClick={addItem}>Add item to cart</button></li>
  );
}

function AvailableItems(props) {
  return (
    <>
      <p>Available Items ({props.availableItems.length})</p>
      <ul>
        {
          props.availableItems.map(item => {
            return <AvailableItem key={item.id} { ...item } dispatch={props.dispatch} />
          })
        }
      </ul>
    </>
  );
}

export const ConnectedAvailableItems = connect(
  (state) => ({
    availableItems: state.availableItems,
  }),
  null
)(AvailableItems);

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
        <ConnectedCart />
        <ConnectedAvailableItems />
      </div>
    );
  }
}