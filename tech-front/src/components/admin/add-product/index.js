import React, { Component } from "react";
import axios from "axios";
import { FormControl, Button, Form, Row } from "react-bootstrap";

import "./add-product.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      description: "",
      price: 0,
    };
  }

  onAddClick = (e) => {
    e.preventDefault();

    const product = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      price: this.state.price,
    };
    axios
      .post("http://localhost:3000/api/products/add", product)
      .then((res) => {
        this.setState({
          name: "",
          description: "",
          imageUrl: "",
          price: 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <section className="contact_form py-5">
          <div className="container">
            <div className="heading"></div>
            <Form className="form-add" noValidate onSubmit={this.onAddClick}>
              <h1 className="header">
                <span>Добавить</span> продукт
              </h1>
              <Row>
                <Form.Group>
                  <Form.Label>Наименование</Form.Label>
                  <FormControl
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
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
                    value={this.state.imageUrl}
                    onChange={this.onChange}
                    className="name"
                    name="imageUrl"
                    placeholder="Картинка"
                    required
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label>Цена</Form.Label>
                  <FormControl
                    type="number"
                    value={this.state.price}
                    onChange={this.onChange}
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
                    value={this.state.description}
                    onChange={this.onChange}
                    name="description"
                    id="description"
                    required
                    as="textarea"
                    rows={3}
                    defaultValue={""}
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
  }
}

export default AddProduct;
