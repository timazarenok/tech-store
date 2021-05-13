import axios from "axios";
import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import CartItem from './cart-item'

import './cart.css'

const Cart = (props) => {
  let { cart_items } = useSelector((state) => state.cart);

  useEffect(() => {
    cart_items = cart_items.map((el) => {
      let data = axios
        .get("http://localhost:3000/api/products/" + el.id)
        .then((response) => response.data);
      return { ...data, count: el.count };
    });
  }, [cart_items.length]);

  return (
    <>
      <ul className="cart-items">
        {cart_items.map((el) => (
          <li>
            <CartItem count={el.count}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default connect(
  (state) => ({
    cart: state.cart,
  }),
  (dispatch) => ({})
)(Cart);
