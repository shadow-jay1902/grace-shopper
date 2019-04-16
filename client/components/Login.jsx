import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
class Login extends React.Component {
  state = {
    errors: {
      email: null,
      password: null
    }
  }
  formSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target
    let flag = false
    if (!email.value) {
      flag = true
      this.setState({
        errors: { ...this.state.errors, email: { exists: true, message: 'Please enter an email' } }
      })
    }
    if (!password.value) {
      flag = true
      this.setState({
        errors: { ...this.state.errors, password: { exists: true, message: 'Please enter a password' } }
      })
    }
    if (flag) return
    this.props.handleSubmit(email.value, password.value)
  }
  render() {
    const { name, handleSubmit, error } = this.props
    return <div className="columns is-centered">
      <div className="column is-one-third">
        <form className="form has-text-centered" onSubmit={this.formSubmit} name={name}>
          {error && error.response && <article className="message is-danger">
            <div className="message-header">
              <button className="delete" aria-label="delete"></button>
            </div>
            <div className="message-body">
              {error.response.data}
            </div>
          </article>}
          <div className="field">
            <label className="label has-text-centered" htmlFor="email">
              <small>Email</small>
            </label>
            <div className="control">
              <input className="input" name="email" type="text"
                onChange={() => this.setState({
                  errors: { ...this.state.errors, password: null }
                })} />
              <p className="help has-text-warning">{this.state.errors.email && this.state.errors.email.message}</p>
            </div>
          </div>
          <div className="field">
            <label className="label has-text-centered">
              <small>Password</small>
            </label>
            <div className="control">
              <input className="input" name="password" type="password"
                onChange={() => this.setState({
                  errors: { ...this.state.errors, email: null }
                })} />
              <p className="help has-text-warning">{this.state.errors.password && this.state.errors.password.message}</p>
            </div>
          </div>
          <div>
            <button className="button is-success" type="submit">Login</button>
          </div>

        </form>
        <a href="/auth/google">Login with Google</a>
      </div>
      <style jsx>{`
        .column{
          margin-top: 3rem;
        }
        `}</style>
    </div>
  }

}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(email, password, name = 'login') {
      dispatch(auth(email, password, name))
    }
  }
}

export default connect(mapLogin, mapDispatch)(Login)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
// Login.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// }
