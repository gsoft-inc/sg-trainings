import React, { Component } from 'react';
import { connect } from "react-redux"
import uuid from "uuid/v4";

import { addItemToCart, clearAllItems, removeCartItem, getItems } from './actions';


// ********************************************** //
// ******************* CART ********************* //
// ********************************************** //

function CartItem(props) {
  const { item } = props;

  function removeItem(event) {
    props.dispatch(removeCartItem(item.id, item.price));
  }

  return (
    <li key={item.id}>{item.name} - {item.price}$ <button onClick={removeItem}>Remove</button></li>
  );
}

function Cart(props) {
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
  function addItem(event) {
    event.stopPropagation();

    props.dispatch(addItemToCart(uuid(), props.name, parseInt(props.price)));
  }

  return (
    <li>{props.name} - {props.price}$ <button onClick={addItem}>Add item to cart</button></li>
  );
}

class AvailableItems extends Component {
  componentWillMount() {
    this.props.dispatch(getItems());
  }

  clearAll(event) {
    event.stopPropagation();

    this.props.dispatch(clearAllItems());
  }

  showLoading() {
    return (
      <div>Loading....</div>
    )
  }

  renderList() {
    return (
      <ul>
        {
          this.props.availableItems.map(item => {
            return <AvailableItem key={item.id} { ...item } dispatch={this.props.dispatch} />
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <>
        <p>Available Items ({this.props.availableItems.length})</p>
        <button onClick={this.clearAll}>Clear All</button>
        {this.props.isLoading ? this.showLoading() : this.renderList()}
      </>
    );
  }
}

export const ConnectedAvailableItems = connect(
  (state) => ({
    availableItems: state.availableItems,
    isLoading: state.isLoading,
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
