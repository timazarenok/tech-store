import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Add } from "../../../redux/actions/cartActions";
import ProductItem from "../../main/product-item";
import FilterParams from "../filter-params";

import "../../main/main.css";
import axios from "axios";

const CatalogLink = (props) => {
  const [products, setProducts] = useState([]);
  const [color, setColor] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState({id: 0, name: ""});
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProducts(response.data));
    axios.get("http://localhost:3000/api/categories/"+props.match.params.id)
    .then(response => setCategory(response.data))
    .catch(err => console.log(err))
  }, [products.length, color.length, manufacturer.length]);

  return (
    <div className="main-block">
      <h1>{category.name}</h1>
      <FilterParams
        name={name}
        setName={setName}
        color={color}
        manufacturer={manufacturer}
        setColor={setColor}
        setManufacturer={setManufacturer}
      />
      <ul className="products">
        {products
          .filter(el => el.categoryId.toString().includes(category.id))
          .filter(el => el.name.includes(name))
          .filter(
            (el) =>
              el.manufacturerId.toString().includes(manufacturer) &&
              el.colorId.toString().includes(color)
          )
          .map((el) => (
            <li>
              <ProductItem {...el} AddToCart={props.AddToCart} />
            </li>
          ))}
      </ul>
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
)(CatalogLink);
