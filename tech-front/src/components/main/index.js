import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Add } from "../../redux/actions/cartActions";
import InfoBlock from "../infoblock";
import ProductItem from "./product-item";
import "./main.css";

import product1Image from "../../images/product1.png";
import axios from "axios";

const Main = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then(response => setProducts(response.data))
  }, [products.length]);

  return (
    <div className="main-block">
      <h1>Техника</h1>
      <ul className="products">
        {products.map((el) => (
          <li>
            <ProductItem {...el} AddToCart={props.AddToCart} />
          </li>
        ))}
      </ul>
      <InfoBlock />
    </div>
  );
};

export default connect(
  (state) => ({
    cart: state.cart,
  }),
  (dispatch) => ({
    AddToCart: (el) => dispatch(Add(el)),
  })
)(Main);
