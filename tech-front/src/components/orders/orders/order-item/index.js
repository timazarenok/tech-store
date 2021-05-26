import React from "react";
import { Card, ListGroup } from "react-bootstrap";

import "./order-item.css";

const OrderItem = ({ id, telephone, address, products }) => {
  return (
    <Card className="order-card">
      <Card.Title className="order-card-title">
        <h2>Номер: {id}</h2>
        <h6 className="telephone">{telephone}</h6>
        <h6 className="address">{address}</h6>
      </Card.Title>
      <Card.Body>
        <ListGroup variant="flush">
          {
            products.map(el => (
              <ListGroup.Item>{el.name}</ListGroup.Item>
            ))
          }
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default OrderItem;
