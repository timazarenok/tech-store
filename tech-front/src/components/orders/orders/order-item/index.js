import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

const OrderItem = ({ id, telephone, address, items }) => {
  return (
    <Card>
      <Card.Title>
        <h2>Номер: {id}</h2>
        <h6>{telephone}</h6>
        <h6>{address}</h6>
      </Card.Title>
    </Card>
  );
};

export default OrderItem;
