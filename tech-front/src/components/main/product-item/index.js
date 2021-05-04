import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./product-item.css";

const ProductItem = ({ id, name, image, description, price }) => (
  <Card>
    <Card.Title className="card-title">{name}</Card.Title>
    <Card.Img className="card-image" src={image} />
    <Card.Text className="description">{description}</Card.Text>
    <div>
      <Card.Text className="price">
        {price}
        <span> BYN</span>
      </Card.Text>
      <Button className="card-button">
        <Link
          className="card-link"
          to={{
            pathname: "/order-form",
            state: { product: { id: id, name: name } },
          }}
        >
          Купить
        </Link>
      </Button>
    </div>
  </Card>
);

export default ProductItem;
