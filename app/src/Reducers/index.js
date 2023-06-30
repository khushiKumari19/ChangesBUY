import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import CarReducer from "./Car.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";
const rootReducer = combineReducers({
    car:CarReducer,
    auth: authReducer,
    user:userReducer,
    cart:cartReducer
})

export default rootReducer;