import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Orders from "../orders/orders";
import AddProduct from "../admin/add-product";
import Colors from "../colors";
import Manufacturers from "../manufacturer";

import axios from "axios";

import "./admin.css";
import AddDelivery from "./add-delivery";
import AddCategory from "./add-category";

const Admin = () => {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    updateData();
  }, [colors.length, manufacturers.length, deliveries.length, categories.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/colors")
      .then((response) => setColors(response.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/manufacturers")
      .then((response) => setManufacturers(response.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/deliveries")
      .then((response) => setDeliveries(response.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
    };

  return (
    <>
      <h1 className="header-admin">Панель Администратора</h1>
      <Orders />
    </>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(Admin);
