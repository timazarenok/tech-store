import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { Add } from "../../redux/actions/cartActions";
import RemoteImage from 'react-remote-image'

import "./product.css";

const Product = (props) => {
  const [data, setData] = useState({});
  const [color, setColor] = useState("");
  const [manufacturer, setManufacturer] = useState({name: "", country: "", proizvod: "", importer: ""});
  const [category, setCategory] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${props.match.params.id}`)
      .then((response) => {
        setData(response.data);
        axios
          .get("http://localhost:3000/api/colors/" + response.data.colorId)
          .then((response) => setColor(response.data.name))
          .catch(err => setColor(""))
        axios
          .get(
            "http://localhost:3000/api/manufacturers/" +
            response.data.manufacturerId
          )
          .then((response) => setManufacturer(response.data))
          .catch(err => setManufacturer(""))
        axios
          .get(
            "http://localhost:3000/api/subcategories/" +
            response.data.subcategoryId
          )
          .then((response) => setCategory(response.data.name))
          .catch(err => setCategory(""))
      })
      .catch((err) => console.log(err));
  }, [data != {}]);

  return (
    <div className="card card-show mb-3">
      <div className="row g-0">
        <div className="col-md-6">
          <Card.Img src={`${data.imageUrl}?auto=compress&cs=tinysrgb&h=350`}
            className="card-show-img"
            alt={data.imageUrl} />
        </div>
        <div className="col-md-6">
          <Card.Body>
            <Card.Title className="card-show-title">{data.name}</Card.Title>
            <Card.Text className="card-show-description">
              {data.description}
            </Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item>Цвет: {color}</ListGroup.Item>
              <ListGroup.Item>Бренд: {manufacturer.name}</ListGroup.Item>
              <ListGroup.Item>Страна: {manufacturer.country}</ListGroup.Item>
              <ListGroup.Item>Производитель: {manufacturer.proizvod}</ListGroup.Item>
              <ListGroup.Item>Импортер: {manufacturer.importer}</ListGroup.Item>
              <ListGroup.Item>Категория: {category}</ListGroup.Item>
              <ListGroup.Item>Ширина: {data.width} см.</ListGroup.Item>
              <ListGroup.Item>Высота: {data.height} см.</ListGroup.Item>
            </ListGroup>
            <Card.Text className="price">{data.price} BYN</Card.Text>
            <Button
              className="card-button"
              onClick={() => props.AddToCart({ id: data.id, name: data.name, price: data.price, count: 1 })}
            >
              Добавить
            </Button>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    cart: state.cart,
  }),
  (dispatch) => ({
    AddToCart: (el) => dispatch(Add(el)),
  })
)(Product);