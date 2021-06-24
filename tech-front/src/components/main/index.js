import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Add } from "../../redux/actions/cartActions";
import InfoBlock from "../infoblock";
import ProductItem from "./product-item";
import "./main.css";
import MyCarousel from '../my-carousel'
import axios from "axios";

const url = "84.201.178.27:3000";

const Main = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://${url}/api/products`).then(response => setProducts(response.data))
  }, [products.length]);

  return (
    <>
      <MyCarousel />
      <div className="main-block">
        <h1>Техника</h1>
        <ul className="products">
          {products.slice(0,10).map((el) => (
            <li>
              <ProductItem {...el} AddToCart={props.AddToCart} />
            </li>
          ))}
        </ul>
        <InfoBlock />
      </div>
    </>
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
