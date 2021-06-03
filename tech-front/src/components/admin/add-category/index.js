import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "./add-category.css";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    updateData();
  }, [categories.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
    };
  const [category, setCategory] = useState("");
  
  const addNew = () => {
    axios
      .post("http://localhost:3000/api/categories/add", { name: category })
      .then((response) => {
        updateData();
        setCategory("");
      })
      .catch((err) => console.log(err));
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:3000/api/categories/" + id)
      .then((reposnse) => updateData())
      .catch((err) => updateData());
  };

  return (
    <>
      <hr />
      <Form className="form-add" onSubmit={addNew}>
        <h1 className="header">Добавление категории товаров</h1>
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control
            placheolder="Введите название категории"
            value={category}
            onChange={onChangeCategory}
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
          {categories.map((el) => (
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

export default AddCategory;
