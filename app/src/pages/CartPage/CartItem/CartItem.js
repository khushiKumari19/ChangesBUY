import React, { useState } from 'react';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, tokenPrice, totalPrice, totalSupply, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };
  const tokenSupply = totalSupply / 1000000000000000000;
  
  return (
    <div className="item">
      <img src={generatePublicUrl(img)} alt={name} />
      <div className="item-details">
        <h3>{name}</h3>
        <p>Total supply: {tokenSupply}</p>
        <p>Token price: ${totalPrice/tokenSupply}</p>


        <div className="quantity">
          <button onClick={onQuantityDecrement} className="minus-btn">
            -
          </button>
          <input type="text" value={qty} readOnly />
          <button onClick={onQuantityIncrement} className="plus-btn">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutCart = (props) => {
  const { cartItems } = props;

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-header">
          <h2>Checkout</h2>
        </div>
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              cartItem={item}
              onQuantityInc={props.onQuantityInc}
              onQuantityDec={props.onQuantityDec}
            />
            
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default CartItem;
