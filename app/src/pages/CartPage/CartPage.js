import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItems } from '../../Actions/cart.actions';
import PriceDetails from '../../components/PriceDetails/PriceDetails';
import CartItem from './CartItem/CartItem';
import './style.css';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

import ERC20TokenABI from '../../Contracts/ERC20Token.json'; // Import the ABI of your smart contract

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const hash = Object.keys(cartItems).map((key) => cartItems[key].hash).join(',');
  const remaining = Object.keys(cartItems).map((key) => cartItems[key].remainingTokens).join(',');
  const supply = Object.keys(cartItems).map((key) => cartItems[key].totalSupply).join(',');
  

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);

        const contractAddress = hash; // Replace with your contract address
        const contractABI = ERC20TokenABI.abi; // Replace with your contract ABI

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContractInstance(contractInstance);
      }
    };

    initializeWeb3();
  }, []);

  const handleBuyTokens = async () => {
    if (contractInstance) {
      try {
        const accounts = await web3.eth.getAccounts();
        const amount = 1; // Change the token amount as per your requirement

        await contractInstance.methods.buyTokens(amount).send({ from: accounts[0], value: web3.utils.toWei('1', 'ether') });
    
        // Perform any additional actions after buying tokens
      } catch (error) {
        // Handle errors
      }
    }
  };


  return (
    <div className="containerInCartPage">
      <div class="cartC">
        <div class="cart">
          <div class="cart-header">
            <h2>Order Summary</h2>
            <h2>{hash}</h2>
            <p>supply: {supply}</p>
            <p>remaining: {remaining}</p>

            
          </div>
          <div class="cart-footer">
            <button type="button" className="button1" onClick={handleBuyTokens}>
              Buy Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;