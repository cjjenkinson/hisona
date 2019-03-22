import React from 'react'
import { AuthConsumer } from '../helpers/AuthContext'
import CuratorHeader from '../components/CuratorHeader';
import Login from "./Login";

const Curators = (props) => (
  <AuthConsumer>
    {({ isAuth }) => (
      isAuth ?
        <div className="container">
          <CuratorHeader />
          <h4>Is Authenticated...</h4>
          {props.children}
        </div>
      : <Login anyProp="Is not Authenticated..." />
    )}
  </AuthConsumer>

)

export default Curators
