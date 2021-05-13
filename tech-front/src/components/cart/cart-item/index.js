import React from 'react'

import './cart-item.css'

const CartItem = ({name, image, price, count}) => {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={image} alt="product" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
        <p>
          {price} BYN, {count} шт.
        </p>
      </div>
    </div>
  )
}

export default CartItem;