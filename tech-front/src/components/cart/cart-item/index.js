import React, { useEffect, useState } from "react";
import axios from "axios";

import "./cart-item.css";
import { DashCircle, PlusCircle, XCircle } from "react-bootstrap-icons";

const CartItem = ({ id, count, onPlus, onMinus, onRemove }) => {
  const [data, setData] = useState({
    id: id,
    name: "",
    imageURL: "",
    price: null,
    count: null,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/products/" + id).then((response) => {
      setData({ ...response.data, count: count });
    });
  }, [data.name.length != 0, count, id]);

  const onPlusClick = () => {
    onPlus(data);
  };

  const onMinusClick = () => {
    onMinus(data);
  };

  const onRemoveClick = () => {
    onRemove(data);
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={data.imageURL} alt="product" />
      </div>
      <div className="cart__item-info">
        <h3>{data.name}</h3>
        <p>
          {data.price} BYN, {data.count} шт.
        </p>
      </div>
      <PlusCircle className="control-button" onClick={onPlusClick} size={25} />
      <DashCircle className="control-button" onClick={onMinusClick} size={25} />
      <XCircle className="control-button" onClick={onRemoveClick} size={25} />
    </div>
  );
};

export default CartItem;
