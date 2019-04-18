import React from 'react'
import { connect } from 'react-redux'
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

export class Cart extends React.Component {
  render() {
    return (
      <div className="has-text-centered">
        <div className="title is-2">Cart</div>
        <ul>{dummyOrderList.map(item => {
          return (
            <div key={item.id}>
              <li>{item.name}</li>
              <p>{item.price}</p>
              <p>{item.quantity}</p>
            </div>
          )
        })}
        </ul>
        <button className="button is-primary" type="button">Checkout</button>
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
