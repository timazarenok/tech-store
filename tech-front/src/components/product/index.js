import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";

import "./product.css";

const Product = (props) => {
  const [data, setData] = useState({});
  const [color, setColor] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${props.match.params.id}`)
      .then((response) => {
        setData(response.data);
        axios
          .get("http://localhost:3000/api/colors/" + response.data.colorId)
          .then((response) => setColor(response.data.name))
          .catch(err => console.log(err))
        axios
          .get(
            "http://localhost:3000/api/manufacturers/" +
              response.data.manufacturerId
          )
          .then((response) => setManufacturer(response.data.name))
          .catch(err => console.log(err))
      })
      .catch((err) => console.log(err));
  }, [data != {}]);

  return (
    <div className="card card-show mb-3">
      <div className="row g-0">
        <div className="col-md-6">
          <Card.Img className="card-show-img" src={data.image} />
        </div>
        <div className="col-md-6">
          <Card.Body>
            <Card.Title className="card-show-title">{data.name}</Card.Title>
            <Card.Text className="card-show-description">
              {data.description}
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>Цвет: {color}</ListGroup.Item>
              <ListGroup.Item>Производитель: {manufacturer}</ListGroup.Item>
            </ListGroup>
            <Card.Text className="price">{data.price} BYN</Card.Text>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default Product;
