import React from "react";
import { connect } from "react-redux";
import Orders from '../orders/orders'
import AddProduct from '../admin/add-product'

import './admin.css'

const Admin = () => {
  return (
    <>
      <h1 className="header-admin">Админская панель</h1>
      <Orders />
      <AddProduct />
    </>
  )
};

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(Admin);
