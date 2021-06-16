import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, Button, Form, Row, Table } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

import "./add-product.css";

const AddProduct = () => {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [subcategories, setCategories] = useState([]);

  useEffect(() => {
    updateData();
  }, [colors.length, manufacturers.length, subcategories.length]);

  const addEmpty = (arr) => {
    arr.unshift({ id: 0, name: "" })
    return arr;
  }

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/colors")
      .then((response) => setColors(addEmpty(response.data)))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/manufacturers")
      .then((response) => setManufacturers(addEmpty(response.data)))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/subcategories")
      .then((response) => setCategories(addEmpty(response.data)))
      .catch((err) => console.log(err));
  };

  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    width: 0,
    height: 0,
    colorId: colors[0] === undefined ? 1 : colors[0].id,
    manufacturerId: manufacturers[0] === undefined ? 1 : manufacturers[0].id,
    subcategoryId: subcategories[0] === undefined ? 1 : subcategories[0].id,
  });

  const onAddClick = (e) => {
    e.preventDefault();
    if(product.width < 0 || product.height < 0 || product.price < 0) {
      NotificationManager.error('Отрицательные данные', 'Ошибка!');
    }
    else {
      axios
        .post("http://localhost:3000/api/products/add", product)
        .then((res) => {
          NotificationManager.success('Продукт был успешно добавлен', "Успех")
          setProduct({
            name: "",
            description: "",
            imageUrl: "",
            price: 0,
            width: 0,
            height: 0,
            colorId: "",
            manufacturerId: "",
            subcategoryId: ""
          });
        })
        .catch((err) => {
          NotificationManager.error('Проверьте вводимые данные', "Ошибка")
        });
    }
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
                <Form.Label>Цена (BYN)</Form.Label>
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
            <Row>
              <Form.Group>
                <Form.Label>Категория товара</Form.Label>
                <FormControl
                  as="select"
                  value={product.subcategoryId}
                  onChange={onChange}
                  className="form-select"
                  name="subcategoryId"
                  id="category"
                  required
                >
                  {subcategories.map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </FormControl>
              </Form.Group>
              <Form.Group>
                <Form.Label>Ширина (см.)</Form.Label>
                <FormControl
                  type="number"
                  value={product.width}
                  onChange={onChange}
                  className="number"
                  name="width"
                  id="width"
                  placeholder="ширина"
                  min="1"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Высота (см.)</Form.Label>
                <FormControl
                  type="number"
                  value={product.height}
                  onChange={onChange}
                  className="number"
                  name="height"
                  id="height"
                  placeholder="высота"
                  min="1"
                  required
                />
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
