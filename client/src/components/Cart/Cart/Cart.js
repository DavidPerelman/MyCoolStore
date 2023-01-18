import React, { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import CartContext from '../../../store/cart-context';
import Modal from '../../UI/Modal/Modal';
import CartItem from '../CartItem/CartItem';
import classes from './Cart.module.css';

const Cart = ({ onCloseCart }) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  if (cartCtx.totalAmount < 0) {
    cartCtx.totalAmount = 0;
  }

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addCartItemAmount(item);
  };

  const cartItemRemoveHandler = (item) => {
    cartCtx.removeCartItemAmount(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            item={item}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={onCloseCart}>
      {!authCtx.currentUser && <p>You must be logged in to place an order!</p>}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={onCloseCart}>
          Close
        </button>
        {hasItems && authCtx.currentUser && (
          <button
            className={classes.button}
            onClick={() =>
              cartCtx.makeAnOrderClick(authCtx.currentUser, cartCtx.items)
            }
          >
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
