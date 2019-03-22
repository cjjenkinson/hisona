import React from "react";
import { Link } from "@reach/router";
import { AuthConsumer } from "../helpers/AuthContext";

const headerStyle = {
  display: "flex",
  color: "#fff",
  backgroundColor: "#242424",
  borderBottom: "1px solid #000",
  justifyContent: "space-between",
  padding: 10
};

const linkStyle = {
  color: "#fff",
  textDecoration: "underline"
};

export default () => (
  <header>
    <AuthConsumer>
      {({ isAuth, login, logout }) => (
        <div style={headerStyle}>
          <h3>
            <Link style={linkStyle} to="/curators">
              Curator Dashboard
            </Link>
          </h3>

          {isAuth ? (
            <ul>
              <Link style={linkStyle} to="reports">
                Reports
              </Link>
              <button onClick={logout}>logout</button>
            </ul>
          ) : (
            <button onClick={login}>login</button>
          )}
        </div>
      )}
    </AuthConsumer>
  </header>
);
