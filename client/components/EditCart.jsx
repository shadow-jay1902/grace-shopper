import React from 'react'
import {connect} from 'react-redux'

return (<div>
  <div className="columns is-centered">
    <div className="column has-text-centered is-three-fifths">
      <div className="title is-2">Cart</div>
      <ul>
        {
          itemsList.map(item => {
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
          })
        )
      </ul>
      </div>
      {/* <p>Total Price {totalPrice(itemsList)} </p> */}
