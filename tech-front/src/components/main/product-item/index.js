import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./product-item.css";

const ProductItem = ({ id, name, image, description, price, AddToCart }) => {
  let history = useHistory();
  return (
    <Card>
      <Card.Title className="card-title">{name}</Card.Title>
      <Card.Img className="card-image" src={image} />
      <Card.Text className="description">{description}</Card.Text>
      <div>
        <Card.Text className="price">
          {price}
          <span> BYN</span>
        </Card.Text>
        <Button
          className="card-button"
          onClick={() => AddToCart({ id: id, name: name, price: price, count: 1 })}
        >
          Купить
        </Button>
        <Button
          className="card-button-more"
          onClick={() => history.push("/product/" + id)}
        >
          Подробнее
        </Button>
      </div>
    </Card>
  );
};

export default ProductItem;
