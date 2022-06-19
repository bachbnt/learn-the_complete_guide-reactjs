import { useReducer } from 'react';
import CartContext from './cartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART') {
    const existCartIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existCartItem = state.items[existCartIndex];
    let updatedItem;
    let updatedItems;

    if (existCartItem) {
      updatedItem = {
        ...existCartItem,
        amount: existCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existCartIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === 'REMOVE_CART') {
    const existCartIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existCartItem = state.items[existCartIndex];
    const updatedTotalAmount = state.totalAmount - existCartItem.price;

    let updatedItem;
    let updatedItems;
    if (existCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItem = {
        ...existCartItem,
        amount: existCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existCartIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: 'ADD_CART', item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCart({ type: 'REMOVE_CART', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
