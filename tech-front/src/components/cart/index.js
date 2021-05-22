import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import CartItem from "./cart-item";
import InputMask from "react-input-mask";

import "./cart.css";

const Cart = (props) => {
  let { cart_items } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");

  useEffect(() => {}, [cart_items.length]);

  const onClickOrder = () => {
    let order = {
      telephone: telephone,
      address: address,
      product: "1",
    };
    axios
      .post("http://localhost:3000/api/add", order)
      .then((res) => {
        setAddress("")
        setTelephone("")
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };

  return (
    <>
      <ul className="cart-items">
        {cart_items.map((el) => (
          <li>
            <CartItem {...el} />
          </li>
        ))}
      </ul>
      {cart_items.length === 0 ? null : (
        <Form className="order-form" onSubmit={onClickOrder}>
          <h2>Оформление заказа</h2>
          <Form.Group>
            <Form.Label>Моб. номер телефона</Form.Label>
            <InputMask
              className="form-control"
              mask="+375 (99) 999-99-99"
              value={telephone}
              placeholder="+375 (99) 99-99-99"
              onChange={onChangeTelephone}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Адрес доставки</Form.Label>
            <Form.Control
              placeholder="Введите адрес"
              value={address}
              onChange={onChangeAddress}
            />
          </Form.Group>
          <Button onClick={onClickOrder}>Оформить заказ</Button>
        </Form>
      )}
    </>
  );
};

export default connect(
  (state) => ({
    cart: state.cart,
  }),
  (dispatch) => ({})
)(Cart);
