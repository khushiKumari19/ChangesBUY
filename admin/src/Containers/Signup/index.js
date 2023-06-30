import React, { useState } from "react";
import Layout from "../../Components/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Form } from "react-bootstrap";
import "./style.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../Action";

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Navigate to={"/signin"} />;
  }

  if (user.loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Layout>
        <Form onSubmit={userSignup}>
          <div className="main">
            <div className="mainTwo">
              <div className="fl">
                <TextField
                  id="standard-basic"
                  label="First Name"
                  variant="standard"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Last Name"
                  variant="standard"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                />
              </div>
              <div className="ep">
                <div className="emailondiv">
                  <TextField
                    type="email"
                    className="email"
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="passwdondiv">
                  <TextField
                    type="password"
                    className="passwd"
                    id="standard-password"
                    label="Password"
                    variant="standard"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="btn">
                <Button type="submit" variant="contained">
                  Signup
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
};

export default Signup;
