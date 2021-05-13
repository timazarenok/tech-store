import { ADD_TO_CART, DELETE_FROM_CART } from "../constants";

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