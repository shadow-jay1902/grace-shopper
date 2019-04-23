import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {getSelectItem} from '../store/item'
import {
  getItemsFromCart,
  removeFromCartThunk,
  checkoutCartThunk
} from '../store/cart'

import {Link} from 'react-router-dom'
import CartItem from './CartItem'
import {decimalCleaner} from '../utils'

// function totalPrice(dummyOrderList) {
//   let result = 0
//   dummyOrderList.forEach(item => {
//     result += item.price * item.quantity
//   })
//   return result
// }

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleEmptyCart = this.handleEmptyCart.bind(this)
    // this.handleCheckout = this.handleCheckout.bind(this)
    this.totalPrice = this.totalPrice.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  // handleCheckout(event) {
  //   console.log('you clicked checkout!')
  // }

  handleRemoveItem(id) {
    this.props.removeItem(id)
  }

  handleEmptyCart() {
    console.log('clicked empty cart')
  }

  handleCheckout() {
    this.props.checkout(
      () => {
        this.props.loadCart()
        this.props.history.push('/home')
      },
      () => {
        this.props.history.push('/login')
      }
    )
  }

  totalPrice(items) {
    let result = 0
    items.forEach(item => {
      result += item.price * item.quantity
    })
    return result
  }

  handleIncrement(item) {
    console.log('clicked increment')
    console.log('Before: ', item.quantity)
    item.quantity++
    console.log('After: ', item.quantity)
    // this.props.loadCart()
  }

  handleDecrement() {
    // console.log('clicked decrement')
  }

  render() {
    console.log('inside of render', this.props.items)
    const itemsList = this.props.items
    return (
      <div className="main columns is-centered">
        <div className="column has-text-centered is-three-fifths">
          <div className="title is-2">Cart</div>
          <ul>
            {itemsList.length ? (
              itemsList.map(item => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    handleRemoveItem={this.handleRemoveItem}
                  />
                )
              })
            ) : (
              <p>Your Cart Is Empty</p>
            )}
          </ul>
          <nav className="navbar is-fixed-bottom has-text-centered">
            <p className="is-size-4 has-text-white has-text-weight-bold">
              Total Price: ${decimalCleaner(this.totalPrice(itemsList))}{' '}
            </p>
            {/* <button
            type="button"
            className="button is-danger"
            onClick={this.handleEmptyCart}
          >
            Empty Cart
          </button> */}
            <button
              onClick={this.handleCheckout}
              className="button is-white has-text-weight-bold"
              type="button"
            >
              Checkout
            </button>
            <Link
              to="/items"
              className="button is-warning  is-success is-one-third"
            >
              Keep Shopping
            </Link>
          </nav>
        </div>
        <style jsx>
          {`
            .card {
              padding: 1rem;
              margin: 2rem;
              height: 10rem;
            }
            .itemName {
              font-weight: bold;
            }
            ul {
              margin-bottom: 4rem;
            }
            .navbar {
              display: flex;
              align-items: center;
              justify-content: space-around;
            }
          `}
        </style>
      </div>
    )
  }
}

const mapState = state => {
  return {
    ...state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadCart: () => {
      return dispatch(getItemsFromCart())
    },
    removeItem: itemId => dispatch(removeFromCartThunk(itemId)),
    checkout: (cb, redirect) => dispatch(checkoutCartThunk(cb, redirect))
  }
}

export const ConnectedCart = connect(mapState, mapDispatch)(Cart)
