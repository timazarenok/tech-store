import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from 'axios'

import './order-form.css'

const OrderForm = (props) => {
  console.log(props)
  const user = props.auth.user;

  const [login, setLogin] = useState(user.login ? user.login : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [address, setAddress] = useState(user.email ? user.email : "");
  const [product, setProduct] = useState({ id: props.location.state.product.id, name: props.location.state.product.name });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const order = {
      login: login,
      address: address,
      email: email,
      product: product.name
    }
    axios.post('http://localhost:3000/api/add', order).then(() => props.history('/'))
  }

  useEffect(() => {
    
  });

  return (
    <Form className="order-form" onSubmit={onSubmit}>
      <h1>Отправить заказ</h1>
      <Form.Row>
        <Form.Group>
          <Form.Label>Имя</Form.Label>
          <FormControl value={login} onChange={onChangeLogin}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Адрес</Form.Label>
          <FormControl value={address} onChange={onChangeAddress}/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <FormControl value={email} onChange={onChangeEmail}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Продукт</Form.Label>
          <FormControl value={product.name} />
        </Form.Group>
      </Form.Row>

      <Button onClick={onSubmit}>Отправить</Button>
    </Form>
  );
};

export default connect(
  (state) => ({
    auth: state.auth,
  }),
  (dispatch) => ({})
)(OrderForm);
