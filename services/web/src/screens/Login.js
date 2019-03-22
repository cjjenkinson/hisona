import React from "react";
import { Link } from "@reach/router";
import { AuthConsumer } from "../helpers/AuthContext";

const Login = ({ anyProp }) => (
  <AuthConsumer>
    {({ isAuth, login }) => (
      <div className="container">
        <h5>{anyProp}</h5>
        <h2>Login</h2>
        <button onClick={login}>LOGIN</button>
        <Link to="/">Go to Landing</Link>
      </div>
    )}
  </AuthConsumer>
);

export default Login;
