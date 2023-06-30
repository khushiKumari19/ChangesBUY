import AuthReducer from "./Auth.reducer";
import UserReducer from "./User.reducer";
import { combineReducers } from "redux";
import CarReducer from "./Car.reducer";

const rootReducer = combineReducers({
    auth:AuthReducer,
    user:UserReducer,
    car:CarReducer,
})

export default rootReducer;