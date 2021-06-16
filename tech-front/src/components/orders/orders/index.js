import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import OrderItem from "./order-item";
import OrderItemHandled from './order-item-handled'
import ReactExport from "react-data-export";

import "./orders.css";
import { Button } from "react-bootstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

  const totalPrice = (arr) => {
    return arr.reduce((sum, el) => sum + el.price * el.orderProduct.count, 0)
  }

  const totalCount = (arr) => {
    return arr.reduce((sum, el) => sum + el.orderProduct.count, 0)
  }

  return (
    <>
      <h1 className="header-order">Необработанные заказы</h1>
      <hr />
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
          <hr />
          <ul className="products">
            {orders.filter(el => el.status === true).map((el) => (
              <li>
                <OrderItemHandled {...el} updateData={updateData} />
              </li>
            ))}
          </ul>
        </>
      )}
      <hr/>
      <ExcelFile element={<Button className="excel-button">Выгрузить в Excel</Button>}>
        <ExcelSheet data={orders} name="Заказы">
          <ExcelColumn label="Номер" value="id" />
          <ExcelColumn label="Адрес" value="address" />
          <ExcelColumn label="Телефон" value="telephone" />
          <ExcelColumn label="Статус" value={(col) => col.status ? "Обработан" : "Не обработан"} />
          <ExcelColumn label="Кол-во товаров" value={(col) => totalCount(col.products)} />
          <ExcelColumn label="Сумма" value={(col) => totalPrice(col.products)} />
        </ExcelSheet>
      </ExcelFile>
    </>
  );
};

export default connect(
  (state) => ({
    data: state.products,
  }),
  (dispatch) => ({})
)(Orders);
