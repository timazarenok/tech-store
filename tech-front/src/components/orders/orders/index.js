import React, { useState } from "react";
import { connect } from "react-redux";
import ProductItem from '../../main/product-item'

import './orders.css'

const Orders = (props) => {

  const [products, setProducts] = useState([])

  return (
    <ul className="products">
      {products.map((el) => (
        <li>
          <ProductItem {...el} />
        </li>
      ))}
    </ul>
  );
};

export default connect(
  (state) => ({
    data: state.products
  }),
  (dispatch) => ({})
)(Orders);
