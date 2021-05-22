import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import OrderItem from "./order-item";

import "./orders.css";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders")
      .then((response) => setOrders(response.data))
      .catch(err => console.log(err))
  }, [orders.length]);

  return (
    <>
      {orders.length === 0 ? null : (
        <ul className="products">
          {orders.map((el) => (
            <li>
              <OrderItem {...el} />
            </li>
          ))}
        </ul>
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
