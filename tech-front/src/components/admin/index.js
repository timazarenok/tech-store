import React from "react";
import { connect } from "react-redux";
import Orders from '../orders/orders'
import AddProduct from '../admin/add-product'
import Colors from '../colors'

import './admin.css'
import Manufacturers from "../manufacturer";

const Admin = () => {
  return (
    <>
      <h1 className="header-admin">Админская панель</h1>
      <Orders />
      <AddProduct />
      <Colors />
      <Manufacturers />
    </>
  )
};

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(Admin);
