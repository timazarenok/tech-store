import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Table, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

import "./manufacturers.css";

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    updateData();
  }, [manufacturers.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/manufacturers")
      .then((response) => setManufacturers(response.data))
      .catch((err) => console.log(err));
  };
  const [manufacturer, setManufacturer] = useState({
    name: "",
    country: "",
    importer: "",
    proizvod: "",
  });

  const addNew = () => {
    axios
      .post("http://localhost:3000/api/manufacturers/add", manufacturer)
      .then((response) => {
        NotificationManager.success('Производитель был успешно добавлен', "Успех")
        updateData();
        setManufacturer("");
      })
      .catch((err) => NotificationManager.error('Проверьте вводимые данные', "Ошибка")
      );
  };

  const onChangeManufacturer = (e) => {
    setManufacturer({ ...manufacturer, [e.target.name]: e.target.value });
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:3000/api/manufacturers/" + id)
      .then((reposnse) => updateData())
      .catch((err) => updateData());
  };

  return (
    <>
      <hr />
      <Form className="form-add" onSubmit={addNew}>
        <h1 className="header">Добавление производителей</h1>
        <Row>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              placheolder="Введите название компании"
              value={manufacturer.name}
              onChange={onChangeManufacturer}
              name="name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Страна</Form.Label>
            <Form.Control
              placheolder="Введите страну"
              value={manufacturer.country}
              onChange={onChangeManufacturer}
              name="country"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Производитель</Form.Label>
            <Form.Control
              placheolder="Введите производителя"
              value={manufacturer.proizvod}
              onChange={onChangeManufacturer}
              name="proizvod"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Импортер</Form.Label>
            <Form.Control
              placheolder="Введите импортера"
              value={manufacturer.importer}
              onChange={onChangeManufacturer}
              name="importer"
            />
          </Form.Group>
        </Row>
        <Button className="submit-button" onClick={addNew}>
          Добавить
        </Button>
      </Form>
      <Table className="colors-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Страна</th>
            <th>Производитель</th>
            <th>Импортер</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((el) => (
            <tr>
              <td>{el.name}</td>
              <td>{el.country}</td>
              <td>{el.proizvod}</td>
              <td>{el.importer}</td>
              <td>
                <Button
                  className="submit-button"
                  onClick={() => onDelete(el.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
    </>
  );
};

export default Manufacturers;
