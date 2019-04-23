import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editItemOnCart} from '../store'
import {decimalCleaner} from '../utils'

class CartItem extends Component {
  state = {
    isEditing: false,
    quantity: 0
  }
  handleChange(val) {
    const {item} = this.props
    let newVal = !this.state.quantity
      ? item.quantity + val
      : this.state.quantity + val
    if (newVal < 1) newVal = 1
    const quantity = Math.min(item.stock, newVal)
    this.setState({
      quantity
    })
  }
  handleEdit() {
    if (!this.state.isEditing) {
      this.setState({isEditing: true})
    } else {
      if (this.state.quantity) {
        this.props.editItemOnCart(this.props.item.id, this.state.quantity)
      }
      this.setState({
        isEditing: false
      })
    }
  }
  render() {
    const {item} = this.props
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <Link to={'/items/' + item.id}>
              <li className="itemName">{item.name}</li>
            </Link>
          </p>
          <p className="card-header-icon">
            <strong>
              Price:{' '}$
              {decimalCleaner(
                (this.state.quantity || item.quantity) * item.price
              )}
            </strong>
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="columns is-vcentered is-mobile">
              <div className="column is-two-thirds">
                <figure className="image is-128x128">
                  <img src={item.photoURLs && item.photoURLs[0]} alt="" />
                </figure>
              </div>
            <p className="column is-one-third cart-header-icon">
              <strong>Quantity: {item.quantity}</strong>
            </p>
            </div>
          </div>
        </div>
        <footer className="card-footer" />
        <style jsx>{`
          .quantity {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .tag {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(null, {editItemOnCart})(CartItem)
