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
    console.log('ITEM!: ', item)
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <Link to={'/items/' + item.id}>
              <li className="itemName">{item.name}</li>
            </Link>
          </p>
          {/* <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a> */}
          <p className="card-header-icon">
            <strong>
              Price:{' '}
              {decimalCleaner(
                (this.state.quantity || item.quantity) * item.price
              )}
            </strong>
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="columns is-mobile is-centered">
              <div className="column is-two-thirds">
                <figure className="image is-4by3">
                  <img src={item.photoURLs && item.photoURLs[0]} alt="" />
                </figure>
              </div>
              <div className="column is-one-third quantity">
                <div className="tag is-large is-rounded">
                  X{this.state.quantity || item.quantity}
                </div>
                <br />
                {this.state.isEditing && (
                  <div className="buttons">
                    <button
                      className="button is-rounded"
                      onClick={() => this.handleChange(-1)}
                    >
                      -
                    </button>
                    <button
                      className="button is-rounded"
                      onClick={() => this.handleChange(1)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <a
            className="card-footer-item has-background-success has-text-white"
            onClick={() => this.handleEdit()}
          >
            {this.state.isEditing ? 'Finish' : 'Edit'}
          </a>
          {this.state.isEditing && (
            <a
              className="card-footer-item"
              onClick={() => this.setState({isEditing: false, quantity: 0})}
            >
              Cancel
            </a>
          )}
          <a
            className="card-footer-item has-background-danger has-text-white has-text-weight-bold"
            type="button"
            onClick={() => this.props.handleRemoveItem(item.id)}
          >
            X
          </a>
        </footer>
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
