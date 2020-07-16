import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart } from './actions';
import { v4 as uuid } from "uuid";

// ********************************************** //
// ******************* CART ********************* //
// ********************************************** //

function Cart() {
  const cartItems = useSelector(state => state.cartItems);
  const cartAmount = useSelector(state => state.cartAmount);

  return (
    <>
      <p>Your Cart (<span>{cartAmount}$</span>)</p>
      <ul>
        {
          cartItems.map(item => {
            return <li key={item.id}>{item.name} - {item.price}$</li>
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

  function handleClick(event) {
    event.stopPropagation();

    dispatch(addItemToCart(uuid(), name, parseInt(price)));
  }

  return (
    <li>{name} - {price}$ <button onClick={handleClick}>Add one item to cart</button></li>
  );
}

function AvailableItems() {
  const availableItems = useSelector(state => state.availableItems);

  return (
    <>
      <p>Available Items ({availableItems.length})</p>
      <ul>
        {
          availableItems.map(item => {
            return <AvailableItem key={item.id} { ...item } />
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