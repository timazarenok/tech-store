import React, {useEffect, useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import axios from 'axios'
import "./order-item-handled.css";

const OrderItemHandled = ({ id, telephone, address, status, products, updateData }) => {

  const setStatus = () => {
    axios
    .put("http://localhost:3000/api/update/"+id, {status: !status})
    .then((response) => updateData())
    .catch(err => console.log(err))
  }

  const totalPrice = () => {
    return products.reduce((sum, el) => sum + el.price * el.orderProduct.count, 0)
  }

  const totalCount = () => {
    return products.reduce((sum, el) => sum + el.orderProduct.count, 0)
  }

  return (
    <Card className="order-card">
      <Card.Title className="order-card-title">
        <h2>Номер: {id}</h2>
        <h6 className="telephone">{telephone}</h6>
        <h6 className="address">{address}</h6>
      </Card.Title>
      <Card.Body>
        <ListGroup variant="flush">
            <ListGroup.Item>{totalCount()} шт.</ListGroup.Item>
            <ListGroup.Item>{totalPrice()} BYN</ListGroup.Item>
        </ListGroup>
        <Button type="submit" onClick={setStatus} className="submit-button">
          {
            status ? "Обработан" : "Не обработан"
          }
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrderItemHandled;
