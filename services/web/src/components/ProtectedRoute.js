import React from 'react'
import { Redirect } from '@reach/router'
import { AuthConsumer } from '../helpers/AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Component
        render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
