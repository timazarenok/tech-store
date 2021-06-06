import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import CartItem from "./cart-item";
import InputMask from "react-input-mask";
import { Delete, Minus, Plus, clear } from "../../redux/actions/cartActions";
import { NotificationManager } from 'react-notifications';

import "./cart.css";

const Cart = (props) => {
  const { cart_items, totalCount, totalPrice } = useSelector(
    (state) => state.cart
  );
  const {user} = useSelector(state => state.auth)

  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [deliveryId, setId] = useState(null);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/deliveries/")
    .then(resposne => {
      setDeliveries(resposne.data);
      setId(resposne.data[0].id);
    })
    .catch(err => console.log(err))
  }, [deliveries.length])

  const onClickOrder = () => {
    let order = {
      telephone: telephone,
      address: address,
      status: false,
      deliveryId: deliveryId,
      userId: user.id
    };
    if(address.length === 0 || telephone.length === 0){
      NotificationManager.error('Проверьте данные еще раз', 'Заказ отклонен')
      return;
    }
    axios
      .post("http://localhost:3000/api/add", order)
      .then((res) => {
        setAddress("");
        setTelephone("");
        cart_items.map(el => {
          axios.post(`http://localhost:3000/api/orders/${res.data.id}/add-product/${el.id}`, {count: el.count})
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
        })
        NotificationManager.success('Заказ принят', 'Успех')
        dispatch(clear());
        props.history.push("/");
      })
      .catch((err) => {
        NotificationManager.error('Проверьте данные еще раз', 'Заказ отклонен')
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

  const onChangeId = (e) => {
    console.log(e.target.value);
    setId(e.target.value);
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
            <Form.Label>Способ доставки</Form.Label>
                <Form.Control
                  as="select"
                  value={deliveryId}
                  onChange={onChangeId}
                  name="deliveryrId"
                  id="delivery"
                  required
                >
                  {deliveries.map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </Form.Control>
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
