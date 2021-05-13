import { ADD_TO_CART, DELETE_FROM_CART } from "../constants";

const initialState = {
  cart_items: [],
  totalPrice: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let item = state.cart_items.find((el) => el.id === action.data.id);
      let index = state.cart_items.findIndex((el) => el.id === action.data.id);

      const newItem = !item
        ? { id: action.data.id, count: action.data.count }
        : {
            ...state.cart_items[index],
            count: state.cart_items[index].count + 1,
          };

      const newItems = !item
        ? [...state.cart_items, newItem]
        : state.cart_items.map((el) => {
            return el.id === newItem.id
              ? { ...el, count: newItem.count }
              : el;
          });
      console.log(state.cart_items);
      return { ...state, cart_items: newItems };
    }
    case DELETE_FROM_CART: {
      let array = state.items;
      const new_items = array.filter((el) => el.number !== action.data.number);

      return {
        ...state,
        cart_items: new_items,
        totalPrice: state.totalPrice - action.data.price,
      };
    }
    default:
      return state;
  }
};
