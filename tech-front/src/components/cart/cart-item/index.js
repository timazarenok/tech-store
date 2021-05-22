import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './cart-item.css'

const CartItem = ({id, count}) => {
  const [data, setData] = useState({name: "", imageURL: "", price: null, count: null})

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products/" + id)
      .then((response) => {
        setData({ ...response.data, count: count });
      });
  }, [data.name.length != 0])
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
    </div>
  )
}

export default CartItem;