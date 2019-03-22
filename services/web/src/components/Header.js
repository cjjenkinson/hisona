import React from 'react'
import { Link } from '@reach/router'
import { AuthConsumer } from '../helpers/AuthContext'
import images from '../themes/images';

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 8
}

const linkStyle = {
  color: '#242424',
  textDecoration: 'underline'
}

export default () => (
  <header>
    <AuthConsumer>
      {({ isAuth, login, logout }) => (
        <div style={headerStyle}>
          <Link style={linkStyle} to="/">
            <img src={images.logo} width="128px"/>
          </Link>

          {isAuth ? (
            <ul>
              <Link style={linkStyle} to="/curators">
                Open Dashboard
              </Link>
              <button onClick={logout}>logout</button>
            </ul>
          ) : (
            <ul>
              <Link style={linkStyle} to="about">
                Features
              </Link>
              <Link style={linkStyle} to="about">
                Curators
              </Link>
              <Link style={linkStyle} to="about">
                Support
              </Link>
              <button onClick={login}>Sign In</button>
            </ul>
          )}
        </div>
      )}
    </AuthConsumer>
  </header>
)
