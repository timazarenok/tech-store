import React, { useEffect, useState } from "react";
import axios from "axios";

import "./cart-item.css";
import { DashCircle, PlusCircle, XCircle } from "react-bootstrap-icons";

const url = "84.201.178.27:3000";

const CartItem = ({ id, count, onPlus, onMinus, onRemove }) => {
  const [data, setData] = useState({
    id: id,
    name: "",
    imageUrl: "",
    price: null,
    count: null,
  });

  useEffect(() => {
    axios.get(`http://${url}/api/products/` + id).then((response) => {
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
        <img className="pizza-block__image" src={`${data.imageUrl}?auto=compress&cs=tinysrgb&h=350`} alt="product" />
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
