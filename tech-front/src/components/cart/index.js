import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import CartItem from "./cart-item";
import InputMask from "react-input-mask";
import { Delete, Minus, Plus } from "../../redux/actions/cartActions";
import "./cart.css";

const Cart = (props) => {
  const { cart_items, totalCount, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");

  const onClickOrder = () => {
    let order = {
      telephone: telephone,
      address: address,
    };
    axios
      .post("http://localhost:3000/api/add", order)
      .then((res) => {
        setAddress("");
        setTelephone("");
        cart_items.map(el => {
          axios.post(`http://localhost:3000/api/orders/${res.data.id}/add-product/${el.id}`)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
        })
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onPlusClick = (data) => {
    dispatch(Plus(data));
  };

  const onMinusClick = (data) => {
    dispatch(Minus(data));
  };

  const onRemoveClick = (data) => {
    dispatch(Delete(data));
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangeTelephone = (e) => {
    setTelephone(e.target.value);
  };

  return (
    <>
      {cart_items.length === 0 ? (
        <div className="cart-empty">
          <h2>Корзина пустая</h2>
          <p>
            Вероятней всего, вы не добвили еще товары.
            <br />
            Для того, чтобы добавить товары, перейди на главную страницу.
          </p>
          <Button
            onClick={() => props.history.push("/")}
            className="button-back"
          >
            Вернуться назад
          </Button>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cart_items.map((el) => (
              <li>
                <CartItem
                  {...el}
                  onPlus={onPlusClick}
                  onMinus={onMinusClick}
                  onRemove={onRemoveClick}
                />
              </li>
            ))}
          </ul>
          <div className="cart__bottom">
            <span>
              Всего товаров: <b>{totalCount} шт.</b>{" "}
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} BYN</b>{" "}
            </span>
          </div>
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
        </>
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
