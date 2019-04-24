import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleItem,
  AllItems,
  ConnectedCart,
  ConnectedOrderHistory
} from './components'
import { me, getItemsFromCart } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData(() => {
      this.props.getCart()
    })
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={ConnectedCart} />
        <Route path="/items/category/:name" component={AllItems} />
        <Route path="/items/:id" component={SingleItem} />
        <Route path="/items" component={AllItems} />
        {isLoggedIn && (
          <Switch>
            <Route path="/order_history" component={ConnectedOrderHistory} />
            <Route path="/home" component={UserHome} />
            <Route component={AllItems} />
          </Switch>
        )}
        <Route component={AllItems} />
      </Switch>
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
    loadInitialData(callback) {
      dispatch(me(callback))
    },
    getCart() {
      dispatch(getItemsFromCart())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
