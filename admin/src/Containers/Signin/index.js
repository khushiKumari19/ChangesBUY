import React, { useState } from "react";
import Layout from "../../Components/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./instyle.css";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { login } from "../../Action";
import { Navigate } from "react-router-dom";

const Signin = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user))
      .then((res) => {
        // Successful login, redirect to homepage
        // window.location.href = "/";
        if (auth.authenticate) {
          return <Navigate to={"/"} />;
        }
      })
      .catch((error) => {
        // Display error message if authentication fails
        setError("Invalid email or password. Please try again.");
      });
  };

  const userLogin = (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Layout>
        <Form onSubmit={handleLogin}>
          <div className="mainOf">
            <div>
              <TextField
                className="em"
                type="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <TextField
                className="ps"
                type="password"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button type="submit" variant="contained">
              Login
            </Button>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default Signin;
