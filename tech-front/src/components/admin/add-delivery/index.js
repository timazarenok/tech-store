import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

import "./add-delivery.css";

const AddDelivery = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    updateData();
  }, [deliveries.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/deliveries")
      .then((response) => setDeliveries(response.data))
      .catch((err) => console.log(err));
    };
  const [delivery, setDelivery] = useState("");
  
  const addNew = () => {
    axios
      .post("http://localhost:3000/api/deliveries/add", { name: delivery })
      .then((response) => {
        NotificationManager.success('Способ доставки был успешно добавлен', "Успех")
        updateData();
        setDelivery("");
      })
      .catch((err) => NotificationManager.error('Проверьте вводимые данные', "Ошибка"));
  };

  const onChangeDelivery = (e) => {
    setDelivery(e.target.value);
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:3000/api/deliveries/" + id)
      .then((reposnse) => updateData())
      .catch((err) => updateData());
  };

  return (
    <>
      <hr />
      <Form className="form-add" onSubmit={addNew}>
        <h1 className="header">Добавление способа доставки</h1>
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control
            placheolder="Введите способ доставки"
            value={delivery}
            onChange={onChangeDelivery}
          />
        </Form.Group>
        <Button className="submit-button" onClick={addNew}>
          Добавить
        </Button>
      </Form>
      <Table className="colors-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((el) => (
            <tr>
              <td>{el.name}</td>
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

export default AddDelivery;
