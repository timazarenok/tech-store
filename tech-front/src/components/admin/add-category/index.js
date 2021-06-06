import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NotificationManager } from 'react-notifications';

import "./add-category.css";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    updateData();
  }, [categories.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((response) => setCategories(addEmpty(response.data)))
      .catch((err) => console.log(err));
  };
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState({ name: "", categoryId: categories[0] === undefined ? 1 : categories[0].id })

  const addNew = () => {
    axios
      .post("http://localhost:3000/api/categories/add", { name: category })
      .then((response) => {
        NotificationManager.success('Категория была успешно добавлена', "Успех")
        updateData();
        setCategory("");
      })
      .catch((err) => NotificationManager.error('Проверьте вводимые данные', "Ошибка"));
  };
  
  const addEmpty = (arr) => {
    arr.unshift({id: 0, name: ""})
    return arr;
  }

  const addNewSub = () => {
    axios
      .post("http://localhost:3000/api/subcategories/add", subCategory)
      .then((response) => {
        updateData();
        setSubCategory({ name: "", categoryId: categories[0] === undefined ? 1 : categories[0].id });
      })
      .catch((err) => console.log(err));
  };

  const onChangeSubCategory = (e) => {
    setSubCategory({...subCategory, [e.target.name]: e.target.value });
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
      <Form className="form-add" onSubmit={addNewSub}>
        <h1 className="header">Добавление подкатегорию товара</h1>
        <Form.Group>
          <Form.Label>Название</Form.Label>
          <Form.Control
            placheolder="Введите название подкатегории"
            value={subCategory.name}
            onChange={onChangeSubCategory}
            name="name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            value={subCategory.categoryId}
            onChange={onChangeSubCategory}
            className="form-select"
            name="categoryId"
            id="subcategory"
            required
          >
            {categories.map((el) => (
              <option value={el.id}>{el.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button className="submit-button" onClick={addNewSub}>
          Добавить
        </Button>
      </Form>
    </>
  );
};

export default AddCategory;
