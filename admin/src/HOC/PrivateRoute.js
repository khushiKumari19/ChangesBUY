import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    return <Element />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
