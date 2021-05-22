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
      color: "",
      manufacturer: "",
      colors: [],
      manufacturers: [],
    };
  }

  onAddClick = (e) => {
    e.preventDefault();
    const product = {
      name: this.state.name,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      price: this.state.price,
      colorId: this.state.color,
      manufacturerId: this.state.manufacturer,
    };
    axios
      .post("http://localhost:3000/api/products/add", product)
      .then((res) => {
        this.setState({
          name: "",
          description: "",
          imageUrl: "",
          price: 0,
          color: "",
          manufacturer: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/colors")
      .then((response) => this.setState({ colors: response.data, color: response.data[0].id }))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/manufacturers")
      .then((response) => this.setState({ manufacturers: response.data, manufacturer: response.data[0].id }))
      .catch((err) => console.log(err));
  }

  onChange = (e) => {
    const { name, value } = e.target;
    console.log(name + value);
    console.log(this.state)
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
                <Form.Group>
                  <Form.Label>Цвет</Form.Label>
                  <FormControl
                    as="select"
                    value={this.state.color}
                    onChange={this.onChange}
                    className="form-select"
                    name="color"
                    id="color"
                    required
                  >
                    {this.state.colors.map((el) => (
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
                <Form.Group>
                  <Form.Label>Производитель</Form.Label>
                  <FormControl
                    as="select"
                    value={this.state.manufacturer}
                    onChange={this.onChange}
                    className="form-select"
                    name="manufacturer"
                    id="manufacturer"
                    required
                  >
                    {this.state.manufacturers.map((el) => (
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
  }
}

export default AddProduct;
