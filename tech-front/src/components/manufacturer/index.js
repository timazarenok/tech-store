import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
  const [manufacturer, setManufacturer] = useState("");

  const addNew = () => {
    axios
      .post("http://localhost:3000/api/manufacturers/add", {
        name: manufacturer,
      })
      .then((response) => {
        updateData();
        setManufacturer("");
      })
      .catch((err) => console.log(err));
  };

  const onChangeManufacturer = (e) => {
    setManufacturer(e.target.value);
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
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control
            placheolder="Введите производителя"
            value={manufacturer}
            onChange={onChangeManufacturer}
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
          {manufacturers.map((el) => (
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

export default Manufacturers;
