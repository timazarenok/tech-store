import React, {useEffect, useState} from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import axios from 'axios'
import "./order-item.css";

const OrderItem = ({ id, telephone, address, status, deliveryId, products, updateData }) => {
  const [delivery, setDelivery] = useState({name: ""})

  const setStatus = () => {
    axios
    .put("http://localhost:3000/api/update/"+id, {status: !status})
    .then((response) => updateData())
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/deliveries/"+deliveryId)
      .then((response) => setDelivery(response.data))
      .catch(err => console.log(err))
  }, [delivery.name.length != 0]);

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
              <ListGroup.Item>{el.name}</ListGroup.Item>
            ))
          }
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

export default OrderItem;
