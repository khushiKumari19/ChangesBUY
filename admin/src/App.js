import React from "react";
import "./App.css";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "./Containers/Home";
import Signin from "./Containers/Signin";
import Signup from "./Containers/Signup";
import AddCar from "./Containers/AddCar/AddCar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isUserLoggedIn } from "./Action";
import PrivateRoute from "./HOC/PrivateRoute";
import CarsPage from "./Containers/CarsPage/CarsPage";
import Metamask from './Containers/Metamask/metamaskk'
import ERC20App from "./Components/ERC20/ERC20App";


function App() {

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home}/>}/>
          <Route path="/addcar" element={<PrivateRoute element={AddCar}/>}/>
          <Route path="/cars" element={<PrivateRoute element={CarsPage}/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/metamask" element={<ERC20App/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
