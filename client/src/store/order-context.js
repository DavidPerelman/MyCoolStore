import React, { createContext, useEffect, useState } from 'react';
import { createOrder } from '../api/ordersApi';
import useLocalStorage from '../hooks/use-local-storage';

const orderCtx = createContext({
  editable: false,
  showCart: () => {},
  hideCart: () => {},
  copyOfOrder: {},
  copyOrderProducts: [],
  totalAmount: 0,
  makeOrderCopy: (id) => {},
  addOrderItemAmount: (id) => {},
  removeOrderItemAmount: (id) => {},
  makeAnOrderClick: (userId) => {},
});

export const OrderContextProvider = (props) => {
  const [totalCartCost, setTotalCartCost] = useState(0);
  const [cartIsShown, setCartIsShown] = useState(false);
  // const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [copyOrder, setCopyOrder] = useState({});
  const [copyOrderProducts, setCopyOrderProducts] = useState([]);

  const makeOrderCopy = async (order) => {
    console.log(order);
    // setCopyOrderProducts(order.products);
    setCopyOrderProducts(order);
    // setCopyOrder(order);
  };

  const calculateTotalCost = () => {
    let itemsPrice = 0;
    for (let i = 0; i < copyOrderProducts.length; i++) {
      console.log((itemsPrice += copyOrderProducts[i].product.price));
    }

    setTotalCartCost(itemsPrice);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [totalCartCost, copyOrderProducts]);

  const onShowCart = () => {
    setCartIsShown(true);
  };

  const onHideCart = () => {
    setCartIsShown(false);
  };

  const addCartItem = (product) => {
    setCopyOrderProducts((prevCartItems) => {
      if (
        prevCartItems.find((cartItem) => cartItem.product._id === product._id)
      ) {
        alert('The product is already in the cart');
        return prevCartItems;
      }
      return [...prevCartItems, { product: product, amount: 1 }];
    });
  };

  const addOrderItemAmount = (item) => {
    console.log(copyOrderProducts);
    console.log(copyOrder.products);
    const existingOrderItemIndex = copyOrderProducts.findIndex((orderItem) => {
      return item.product._id === orderItem.product._id;
    });

    console.log(existingOrderItemIndex);

    let updatedItems;

    const existingOrderItem = copyOrderProducts[existingOrderItemIndex];
    console.log(existingOrderItem);
    if (existingOrderItem.productQuantity === 99) {
      return;
    } else {
      if (existingOrderItem) {
        const updatedItem = {
          ...existingOrderItem,
          productQuantity: (existingOrderItem.productQuantity += 1),
        };

        copyOrderProducts[existingOrderItemIndex] = updatedItem;
        setCopyOrderProducts(copyOrderProducts);

        console.log((copyOrder.products = copyOrderProducts));
        setCopyOrder((copyOrder) => (copyOrder.products = copyOrderProducts));

        // return;
        // updatedItems = [...copyOrder];
        // updatedItems[existingOrderItemIndex] = updatedItem;
      }
      // setCopyOrder(updatedItems);
      console.log(copyOrder);
    }
  };

  const removeCartItemAmount = (item) => {
    const existingCartItemIndex = copyOrderProducts.findIndex((cartItem) => {
      return item.product._id === cartItem.product._id;
    });

    const existingItem = copyOrderProducts[existingCartItemIndex];
    const updatedTotalAmount = totalCartCost - existingItem.product.price;
    setTotalCartCost(updatedTotalAmount);

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = copyOrderProducts.filter((cartItem) => {
        return item.product._id !== cartItem.product._id;
      });
    } else {
      const updatedItem = {
        ...existingItem,
        amount: (existingItem.amount -= 1),
      };
      updatedItems = [...copyOrderProducts];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    setCopyOrderProducts(updatedItems);
  };

  const makeAnOrderClick = (currentUser, cartItems) => {
    createOrder(currentUser.uid, cartItems);
  };

  const contextValue = {
    cartIsShown: cartIsShown,
    showCart: onShowCart,
    hideCart: onHideCart,
    copyOfOrder: copyOrder,
    copyOrderProducts: copyOrderProducts,
    totalAmount: totalCartCost,
    makeOrderCopy: makeOrderCopy,
    addOrderItemAmount: addOrderItemAmount,
    removeCartItemAmount: removeCartItemAmount,
    makeAnOrderClick: makeAnOrderClick,
  };

  return (
    <orderCtx.Provider value={contextValue}>{props.children}</orderCtx.Provider>
  );
};

export default orderCtx;
