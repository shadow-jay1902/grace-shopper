import React from 'react'
import {connect} from 'react-redux'
import {login, signup} from '../store'

class AuthForm extends React.Component {
  state = {
    errors: {}
  }

  componentDidMount() {
    for (let field of this.props.fields) {
      this.setState({
        errors: {
          [field.name]: null
        }
      })
    }
  }

  formSubmit = e => {
    e.preventDefault()
    let flag = false
    const values = {}
    for (let field of this.props.fields) {
      const {value} = e.target[field.name]
      if (!value) {
        flag = true
        this.setState({
          errors: {
            ...this.state.errors,
            [field.name]: {exists: true, message: 'Please enter ' + field.name}
          }
        })
      } else {
        values[field.name] = value
      }
    }
    if (flag) return true
    this.props.handleSubmit(values)
  }

  renderInput = (name, type = 'text', i) => {
    return (
      <div key={i} className="field">
        <label className="label has-text-centered">
          <small>
            {name === 'firstName'
              ? 'first name'
              : name === 'lastName' ? 'last name' : name}
          </small>
        </label>
        <div className="control">
          <input
            className="input"
            name={name}
            type={type}
            onChange={() =>
              this.setState({
                errors: {...this.state.errors, [name]: null}
              })
            }
          />
          <p className="help has-text-danger">
            {this.state.errors[name] && this.state.errors[name].message}
          </p>
        </div>
      </div>
    )
  }

  render() {
    const {formName, displayName, error, fields} = this.props
    return (
      <div className="columns is-centered">
        <div className="column has-text-centered is-one-third">
          <h1 className="title is-3">{displayName}</h1>
          <form className="form " onSubmit={this.formSubmit} name={formName}>
            {error &&
              error.response && (
                <article className="message is-danger">
                  <div className="message-header">
                    `
                    <button className="delete" aria-label="delete" />
                  </div>
                  <div className="message-body">{error.response.data}</div>
                </article>
              )}
            {fields.map(({name, type}, i) => {
              return this.renderInput(name, type, i)
            })}
            <div>
              <button className="button is-success" type="submit">
                {displayName}
              </button>
            </div>
          </form>
        </div>
        <style jsx>{`
          .column {
            margin-top: 3rem;
          }
        `}</style>
      </div>
    )
  }
}

const mapLogin = state => {
  return {
    formName: 'login',
    displayName: 'Login',
    error: state.user.error,
    fields: [
      {
        name: 'email',
        type: 'email'
      },
      {
        name: 'password',
        type: 'password'
      }
    ]
  }
}

const mapSignup = state => {
  return {
    formName: 'signup',
    displayName: 'Signup',
    error: state.user.error,
    fields: [
      {
        name: 'email',
        type: 'email'
      },
      {
        name: 'password',
        type: 'password'
      },
      {
        name: 'firstName'
      },
      {
        name: 'lastName'
      },
      {
        name: 'address'
      },
      {
        name: 'phone',
        type: 'tel'
      },
      {
        name: 'dob',
        type: 'date'
      }
    ]
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(values) {
      dispatch(login(values))
    }
  }
}

const mapDispatchSignup = dispatch => {
  return {
    handleSubmit(values) {
      dispatch(signup(values))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm)
