import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

import "./colors.css";

const url = "84.201.178.27:3000";

const Colors = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    updateData();
  }, [colors.length]);

  const updateData = () => {
    axios
      .get(`http://${url}/api/colors`)
      .then((response) => setColors(response.data))
      .catch((err) => console.log(err));
  };
  const [color, setColor] = useState("");

  const addNew = () => {
    axios
      .post(`http://${url}/api/colors/add`, { name: color })
      .then((response) => {
        NotificationManager.success('Цвет был успешно добавлен', "Успех")
        updateData();
        setColor("");
      })
      .catch((err) => NotificationManager.error('Проверьте вводимые данные', "Ошибка")
      );
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onDelete = (id) => {
    axios
      .delete(`http://${url}/api/colors/` + id)
      .then((reposnse) => updateData())
      .catch((err) => updateData());
  };

  return (
    <>
      <hr />
      <Form className="form-add" onSubmit={addNew}>
        <h1 className="header">Добавление цвет</h1>
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control
            placheolder="Введите цвет"
            value={color}
            onChange={onChangeColor}
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
          {colors.map((el) => (
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

export default Colors;
