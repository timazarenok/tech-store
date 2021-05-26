import React, { Component, useState } from "react";
import axios from "axios";
import { FormControl, Button, Form, Row } from "react-bootstrap";

import "./add-product.css";

const AddProduct = ({ colors, manufacturers }) => {
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    colorId: colors[0],
    manufacturerId: manufacturers[0],
  });

  const onAddClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/products/add", product)
      .then((res) => {
        setProduct({
          name: "",
          description: "",
          imageUrl: "",
          price: 0,
          colorId: "",
          manufacturerId: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <>
      <section className="contact_form py-5">
        <div className="container">
          <div className="heading"></div>
          <Form className="form-add" noValidate onSubmit={onAddClick}>
            <h1 className="header">
              <span>Добавить</span> продукт
            </h1>
            <Row>
              <Form.Group>
                <Form.Label>Наименование</Form.Label>
                <FormControl
                  type="text"
                  value={product.name}
                  onChange={onChange}
                  className="name"
                  name="name"
                  id="name"
                  placeholder="Название"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ссылка на картинку</Form.Label>
                <FormControl
                  type="text"
                  value={product.imageUrl}
                  onChange={onChange}
                  className="name"
                  name="imageUrl"
                  placeholder="Картинка"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Цвет</Form.Label>
                <FormControl
                  as="select"
                  value={product.colorId}
                  onChange={onChange}
                  className="form-select"
                  name="colorId"
                  id="color"
                  required
                >
                  {colors.map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </FormControl>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label>Цена</Form.Label>
                <FormControl
                  type="number"
                  value={product.price}
                  onChange={onChange}
                  className="number"
                  name="price"
                  id="price"
                  placeholder="цена"
                  min="1"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Описание</Form.Label>
                <FormControl
                  placeholder="Описание"
                  value={product.description}
                  onChange={onChange}
                  name="description"
                  id="description"
                  required
                  as="textarea"
                  rows={3}
                  defaultValue={""}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Производитель</Form.Label>
                <FormControl
                  as="select"
                  value={product.manufacturerId}
                  onChange={onChange}
                  className="form-select"
                  name="manufacturerId"
                  id="manufacturer"
                  required
                >
                  {manufacturers.map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </FormControl>
              </Form.Group>
            </Row>
            <div className="input-w3ls">
              <Button type="submit" className="submit-button">
                Подтвердить
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default AddProduct;
