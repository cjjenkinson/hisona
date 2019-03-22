import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  render() {
    return (
      <div className="pa4 flex justify-center bg-white">
        <form onSubmit={this._signup}>
          <h3>Sign Up</h3>
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="First Name"
            type="text"
            onChange={e => this.setState({ lastName: e.target.value })}
            value={this.state.firstName}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Last Name"
            type="text"
            onChange={e => this.setState({ firstName: e.target.value })}
            value={this.state.lastName}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Email"
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
          />
          <input
            autoFocus
            className="w-100 pa2 mv2 br2 b--black-20 bw1"
            placeholder="Enter Password"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />

          <input
            className={`pa3 bg-black-10 dim pointer}`}
            disabled={!this.state.email || !this.state.firstName || !this.state.password}
            type="submit"
            value="Sign Up"
          />
          <h3>
            Already have an account! <a href="/login"> Login</a>
          </h3>
        </form>
      </div>
    )
  }

  _signup = async e => {
    e.preventDefault()
    const { firstName, lastName, email, password } = this.state
    const result = await this.props.signupMutation({
      variables: {
        firstName,
        lastName,
        email,
        password,
      },
    })

    const token = result.data.signup.token
    localStorage.setItem(AUTH_TOKEN, token)

    this.props.refreshTokenFn &&
      this.props.refreshTokenFn({
        [AUTH_TOKEN]: token,
      })

    this.props.history.replace('/')
    window.location.reload()
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`

export default graphql(SIGNUP_USER_MUTATION, { name: 'signupMutation' })(withRouter(SignupPage))
