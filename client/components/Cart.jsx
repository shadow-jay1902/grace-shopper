import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {getSelectItem} from '../store/item'

const dummyOrderList = [
  {
    name: 'recordPlayer',
    quantity: '1',
    price: 100,
    id: 1
  },
  {
    name: 'album',
    quantity: '4',
    price: 15,
    id: 2
  },
  {
    name: 'cassette',
    quantity: 10,
    price: 5,
    id: 3
  }
]

function totalPrice(dummyOrderList) {
  let result = 0
  dummyOrderList.forEach(item => {
    result += item.price * item.quantity
  })
  return result
}

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleRemoveItem = this.handleRemoveItem.bind(this)
    this.handleEmptyCart = this.handleEmptyCart.bind(this)
  }

  handleCheckout(event) {
    //use the orderID to make order dispatch
    console.log('you clicked checkout!')
  }

  handleRemoveItem(event) {
    console.log('you clicked remove single item!')
    console.log('that item id is: ', event.target.id)
  }

  handleEmptyCart() {
    console.log('clicked empty cart')
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column has-text-centered is-three-fifths">
          <div className="title is-2">Cart</div>
          <ul>
            {dummyOrderList.map(item => {
              return (
                <div className="card" key={item.id}>
                  <li className="itemName">{item.name}</li>
                  <strong>Price: {item.price}</strong>
                  <p>X {item.quantity}</p>
                  <button
                    className="button is-danger is-small is-pulled-right is-rounded"
                    type="button"
                    onClick={this.handleRemoveItem}
                    id={item.id}
                  >
                    X
                  </button>
                </div>
              )
            })}
          </ul>
          <p>Total Price {totalPrice(dummyOrderList)} </p>
          <button
            type="button"
            className="button is-danger"
            onClick={this.handleEmptyCart}
          >
            Empty Cart
          </button>
          <button
            onClick={this.handleCheckout}
            className="button is-primary"
            type="button"
          >
            Checkout
          </button>
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
          `}
        </style>
      </div>
    )
  }
}

// display all items in the cart
// display name of items
// display quantity of items
// display options to update the quantity of items
// display price of items
// display total price of items
// should have a checkout button
