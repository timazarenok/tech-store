import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormControl, Row, Col } from "react-bootstrap";

import "./filter-params.css";

const FilterParams = (props) => {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const { name, setName, color, manufacturer, setColor, setManufacturer } =
    props;

  useEffect(() => {
    updateData();
  }, [colors.length, manufacturers.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/colors")
      .then((response) => {
        response.data.unshift({name: ""})
        setColors(response.data);
        setColor(colors[0].id.toString());
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/manufacturers")
      .then((response) => {
        response.data.unshift({name: ""})
        setManufacturers(response.data);
        setManufacturer(manufacturers[0].id.toString());
      })
      .catch((err) => console.log(err));
  };

  const onChange = (e) => {
    switch (e.target.name) {
      case "color":
        setColor(e.target.value);
        break;
      case "manufacturer":
        setManufacturer(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      default:
        return null;
    }
  };

  return (
    <Form className="filter-form">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <FormControl
              type="text"
              value={name}
              onChange={onChange}
              className="form-select"
              name="name"
              id="name"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Цвет</Form.Label>
            <FormControl
              as="select"
              value={color}
              onChange={onChange}
              className="form-select"
              name="color"
              id="color"
              required
            >
              {colors.map((el) => (
                <option value={el.id}>{el.name}</option>
              ))}
            </FormControl>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Производитель</Form.Label>
            <FormControl
              as="select"
              value={manufacturer}
              onChange={onChange}
              className="form-select"
              name="manufacturer"
              id="manufacturer"
              required
            >
              {manufacturers.map((el) => (
                <option value={el.id}>{el.name}</option>
              ))}
            </FormControl>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterParams;
