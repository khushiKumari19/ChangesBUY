import axios from "../helpers/axios";
import store from '../Store/index';
import { cartConstants } from "./Constants";

const getCartItems = () => {
    return async dispatch =>{
        dispatch({type:cartConstants.ADD_TO_CART_REQUEST});
        const res = await axios.post('/user/getCartItems')
        if(res.status === 200){
            const {cartItems} = res.data;
            if(cartItems){
                dispatch({
                    type:cartConstants.ADD_TO_CART_SUCCESS,
                    payload:{cartItems}
                })
            }else{
                console.log('No cart data found');
            }
        }
    }
}

export const addToCart = (car,newQty=1)=>{
    return async (dispatch) =>{
        const {
            cart : {cartItems},
            auth,
        } = store.getState();
        const qty = cartItems[car._id] ? parseInt(cartItems[car._id].qty + newQty) : 1;
        cartItems[car._id] = {
            ...car,
            qty,
        }
        if(auth.authenticate){
            dispatch({type: cartConstants.ADD_TO_CART_REQUEST});
            const payload = {
                cartItems: [{
                    car:car._id,
                    quantity:qty
                }]
            }
            const res = await axios.post('/user/cart/addtocart',payload);
            if(res.status === 201){
                dispatch(getCartItems())
            }
        }else{
            localStorage.setItem("cart",JSON.stringify(cartItems))
        }
        dispatch({
            type:cartConstants.ADD_TO_CART_SUCCESS,
            payload:{cartItems}
        })
    }
}


export const removeCartItem = (payload) => {
    return async (dispatch) => {
      try {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
        const res = await axios.post(`/user/cart/removeItem`, { payload });
        if (res.status === 202) {
          dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
          dispatch(getCartItems());
        } else {
          const { error } = res.data;
          dispatch({
            type: cartConstants.REMOVE_CART_ITEM_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  
export const updateCart = () => {
    return async (dispatch) => {
      const { auth } = store.getState();
      let cartItems = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
  
      if (auth.authenticate) {
        localStorage.removeItem("cart");
        if (cartItems) {
          const payload = {
            cartItems: Object.keys(cartItems).map((key, index) => {
              return {
                quantity: cartItems[key].qty,
                car: cartItems[key]._id,
              };
            }),
          };
          if (Object.keys(cartItems).length > 0) {
            const res = await axios.post(`/user/cart/addtocart`, payload);
            if (res.status === 201) {
              dispatch(getCartItems());
            }
          }
        }
      } else {
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    }
  }
  
  export { getCartItems }