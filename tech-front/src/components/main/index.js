import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import InfoBlock from "../infoblock";
import ProductItem from "./product-item";
import "./main.css";

import product1Image from '../../images/product1.png'

const Main = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Test",
      image: product1Image,
      description:
        "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
      price: 125,
    },
    {
      id: 2,
      name: "Test",
      image: product1Image,
      description:
        "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
      price: 125,
    },
    {
      id: 3,
      name: "Test",
      image: product1Image,
      description:
        "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest",
      price: 125,
    },
  ]);

  useEffect(() => {}, []);

  return (
    <div className="main-block">
      <h1>Техника</h1>
      <ul className="products">
        {products.map((el) => (
          <li>
            <ProductItem {...el} />
          </li>
        ))}
      </ul>
      <InfoBlock />
    </div>
  );
};

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(Main);
