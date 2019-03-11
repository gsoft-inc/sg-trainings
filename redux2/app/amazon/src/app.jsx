import React, { Component } from 'react';
import { connect } from "react-redux"
import { addItemToCart } from './actions';
import uuid from "uuid/v4";

// ********************************************** //
// ******************* CART ********************* //
// ********************************************** //

function Cart(props) {
  return (
    <>
      <p>Your Cart (<span>{props.cartAmount}$</span>)</p>
      <ul>
        {
          props.cartItems.map(item => {
            return <li key={item.id}>{item.name} - {item.price}$</li>
          })
        }
      </ul>
    </>
  );
}

export const ConnectedCart = connect(
  (state) => ({
    cartAmount: state.cartAmount,
    cartItems: state.cartItems
  }),
  null
)(Cart);


// ********************************************** //
// ******************* ITEM ********************* //
// ********************************************** //

function AvailableItem(props) {
  function handleClick(event) {
    event.stopPropagation();

    props.dispatch(addItemToCart(uuid(), props.name, parseInt(props.price)));
  }

  return (
    <li>{props.name} - {props.price}$ <button onClick={handleClick}>Add one item to cart</button></li>
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