import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  MINUS_ITEM,
  PLUS_ITEM,
} from "../constants";

const initialState = {
  cart_items: [],
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) =>
  arr.reduce((sum, obj) => obj.price * obj.count + sum, 0);

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = state.cart_items.find((el) => el.id === action.data.id);
      const index = state.cart_items.findIndex(
        (el) => el.id === action.data.id
      );

      const newItem = !item
        ? { id: action.data.id, ...action.data, count: action.data.count }
        : {
            ...state.cart_items[index],
            count: state.cart_items[index].count + 1,
          };

      const newItems = !item
        ? [...state.cart_items, newItem]
        : state.cart_items.map((el) => {
            return el.id === newItem.id ? { ...el, count: newItem.count } : el;
          });

      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        cart_items: newItems,
        totalPrice: totalPrice,
        totalCount: newItems.length,
      };
    }
    case PLUS_ITEM: {
      const index = state.cart_items.findIndex(
        (el) => el.id === action.data.id
      );
      const previousCount = state.cart_items[index].count;

      const newItem = {
        ...state.cart_items[index],
        count: previousCount + 1,
      };

      const newItems = state.cart_items.map((el) => {
        return el.id === newItem.id ? { ...el, count: newItem.count } : el;
      });
      const totalPrice = getTotalPrice(newItems);

      return { ...state, cart_items: newItems, totalPrice: totalPrice };
    }
    case MINUS_ITEM: {
      const index = state.cart_items.findIndex(
        (el) => el.id === action.data.id
      );
      const previousCount = state.cart_items[index].count;

      if (previousCount === 1) {
        state.cart_items.splice(index, 1);

        const totalPrice = getTotalPrice(state.cart_items);

        return {
          ...state,
          items: state.cart_items,
          totalCount: state.cart_items.length,
          totalPrice: totalPrice,
        };
      } else {
        const newItem = {
          ...state.cart_items[index],
          count: previousCount - 1,
        };

        const newItems = state.cart_items.map((el) => {
          return el.id === newItem.id ? { ...el, count: newItem.count } : el;
        });

        const totalPrice = getTotalPrice(newItems);

        return { ...state, cart_items: newItems, totalPrice: totalPrice };
      }
    }

    case DELETE_FROM_CART: {
      const index = state.cart_items.findIndex(
        (el) => el.id === action.data.id
      );
      const newItems = [...state.cart_items];
      newItems.splice(index,1);
      const totalPrice = getTotalPrice(newItems);

      return {
        ...state,
        cart_items: newItems,
        totalPrice: totalPrice,
        totalCount: newItems.length
      };
    }
    default:
      return state;
  }
};
