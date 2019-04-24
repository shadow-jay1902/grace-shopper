import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

class Navbar extends Component {
  state = {
    menu: false
  }

  toggleMenu = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/cart">
            <img src="https://images.emojiterra.com/google/android-nougat/512px/1f6d2.png" />
          </a>

          <div className="navbar-item">
            <Link className="button is-info" to="/items">
              View Products
            </Link>
          </div>
          <div className="title"><strong>The Gallery of VAR-ious Programming Memes</strong></div>
          <a
            onClick={this.toggleMenu}
            role="button"
            className={`navbar-burger burger ${
              this.state.menu ? 'is-active' : ''
              }`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div className={`navbar-menu ${this.state.menu ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {this.props.isLoggedIn ? (
                  <div>
                    <Link to="/home" className="button is-primary">
                      Home
                    </Link>
                    <a
                      onClick={this.props.handleClick}
                      className="button is-warning"
                    >
                      <strong>Logout</strong>
                    </a>
                  </div>
                ) : (
                    <>
                      <Link to="/login" className="button is-primary">
                        <strong>Login</strong>
                      </Link>
                      <Link to="/signup" className="button is-light">
                        Sign Up
                      </Link>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .navbar-item img {
            transform: scale(2, 2);
            position: relative;
            left: 1rem;
          }
          .title {
            font-size: 30px;
          }
        `}</style>
      </nav>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
