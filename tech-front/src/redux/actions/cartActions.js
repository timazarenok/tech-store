import { ADD_TO_CART, DELETE_FROM_CART, MINUS_ITEM, PLUS_ITEM } from "../constants";

const addToCart = (data) => ({
  type: ADD_TO_CART,
  data: data
})

export const Add = (data) => dispatch => {
  dispatch(addToCart(data))
}

const removeFromCart = (data) => ({
  type: DELETE_FROM_CART,
  data: data
})

export const Delete = (data) => dispatch => {
  dispatch(removeFromCart(data))
}

const plusItem = (data) => ({
  type: PLUS_ITEM,
  data: data
})

export const Plus = (data) => dispatch => {
  dispatch(plusItem(data))
}

const minusItem = (data) => ({
  type: MINUS_ITEM,
  data: data
})

export const Minus = (data) => dispatch => {
  dispatch(minusItem(data))
}