import React, {useEffect, useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import axios from 'axios'
import "./order-item.css";

const url = "84.201.178.27:8000";

const OrderItem = ({ id, telephone, address, status, deliveryId, products, updateData }) => {
  const [delivery, setDelivery] = useState({name: ""})

  const setStatus = () => {
    axios
    .put(`http://${url}//api/update/`+id, {status: !status})
    .then((response) => updateData())
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios
      .get(`http://${url}//api/deliveries/`+deliveryId)
      .then((response) => {
        if(response.data) {
          setDelivery(response.data)
        }
        else {
          setDelivery({name: ""})
        }
      })
      .catch(err => console.log(err))
  }, [delivery.name.length != 0]);

  const totalPrice = (arr) => {
    return arr.reduce((sum, el) => sum + el.price * el.orderProduct.count, 0)
  }

  const totalCount = (arr) => {
    return arr.reduce((sum, el) => sum + el.orderProduct.count, 0)
  }

  return (
    <Card className="order-card">
      <Card.Title className="order-card-title">
        <h2>Номер: {id}</h2>
        <h6 className="telephone">{telephone}</h6>
        <h6 className="address">{address}</h6>
        <h6 className="address">{delivery.name}</h6>
      </Card.Title>
      <Card.Body>
        <ListGroup variant="flush">
          {
            products.map(el => (
              <ListGroup.Item>{el.name} {el.orderProduct.count}шт. {el.price * el.orderProduct.count} BYN</ListGroup.Item>
            ))
          }
        </ListGroup>
        <Card.Text>Кол-во: {totalCount(products)} шт.</Card.Text>
        <Card.Text>Сумма: {totalPrice(products)} BYN</Card.Text>
        <Button type="submit" onClick={setStatus} className="submit-button">
          {
            status ? "Обработан" : "Не обработан"
          }
        </Button>
      </Card.Body>
    </Card>
  );
};

export default OrderItem;
