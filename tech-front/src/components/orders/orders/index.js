import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import OrderItem from "./order-item";
import OrderItemHandled from './order-item-handled'

import "./orders.css";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    updateData();
  }, [orders.length]);

  const updateData = () => {
    axios
    .get("http://localhost:3000/api/orders")
    .then((response) => setOrders(response.data))
    .catch(err => console.log(err))
  }

  return (
    <>
      <h1 className="header-order">Необработанные заказы</h1>
        <hr/>
      {orders.length === 0 ? null : (
        <>
        <ul className="products">
          {orders.filter(el => el.status === false).map((el) => (
            <li>
              <OrderItem {...el} updateData={updateData} />
            </li>
          ))}
        </ul>
        <h1 className="header-order">Обработанные заказы</h1>
        <hr/>
        <ul className="products">
        {orders.filter(el => el.status === true).map((el) => (
          <li>
            <OrderItemHandled {...el} updateData={updateData} />
          </li>
        ))}
        </ul>
      </>
      )}
    </>
  );
};

export default connect(
  (state) => ({
    data: state.products,
  }),
  (dispatch) => ({})
)(Orders);
