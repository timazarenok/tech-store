import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Orders from "../orders/orders";
import AddProduct from "../admin/add-product";
import Colors from "../colors";
import Manufacturers from "../manufacturer";

import axios from "axios";

import "./admin.css";

const Admin = () => {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    updateData();
  }, [colors.length, manufacturers.length]);

  const updateData = () => {
    axios
      .get("http://localhost:3000/api/colors")
      .then((response) => setColors(response.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:3000/api/manufacturers")
      .then((response) => setManufacturers(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="header-admin">Админская панель</h1>
      <Orders />
      <AddProduct colors={colors} manufacturers={manufacturers} />
      <Colors colors={colors} updateData={updateData} />
      <Manufacturers manufacturers={manufacturers} updateData={updateData} />
    </>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(Admin);
