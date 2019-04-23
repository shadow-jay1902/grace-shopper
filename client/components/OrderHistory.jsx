import React from 'react'
import {connect} from 'react-redux'
import {getOrderHistoryThunk, orderHistoryReducer} from '../store/order-history'

import {Link} from 'react-router-dom'
import HistoryItem from './HistoryItem'
import {decimalCleaner} from '../utils'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadHistory()
  }

  render() {
    let {orderHistory} = this.props
    if (orderHistory) {
      orderHistory = orderHistory
        .filter(order => order.items.length)
        .map(order => {
          return {
            ...order,
            totalPrice: order.items.reduce((acc, item) => {
              acc += item.price
              return acc
            }, 0)
          }
        })
    }
    return (
      <div className="main columns is-centered">
        <div className="column has-text-centered is-three-fifths">
          <div className="title is-2">Previous Orders</div>
          <ul>
            {orderHistory ? (
              orderHistory
                .map(order => {
                  return (
                    <div key={order.id}>
                      <div className="box">
                        <p>
                          <strong>
                            Ordered On: {order.updatedAt.slice(0, 10)}
                          </strong>
                        </p>
                        <p>
                          <strong>
                            Total Price: ${decimalCleaner(order.totalPrice)}
                          </strong>
                        </p>
                        {order.items.map(item => {
                          return <HistoryItem key={item.id} item={item} />
                        })}
                      </div>
                      <hr />
                    </div>
                  )
                })
                .reverse()
            ) : (
              <p>No Order History To Show</p>
            )}
          </ul>
          <nav className="navbar is-fixed-bottom">
            {/* <p className="is-size-4 has-text-white has-text-weight-bold">
              Total Price: {decimalCleaner(this.totalPrice(itemsList))}{' '}
            </p> */}
            {/* <button
            type="button"
            className="button is-danger"
            onClick={this.handleEmptyCart}
          >
            Empty Cart
          </button> */}
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
            hr {
              border: 0;
              height: 1px;
              background: #333;
              background-image: linear-gradient(to right, #ccc, #333, #ccc);
            }
          `}
        </style>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orderHistory: state.history.history
  }
}

const mapDispatch = dispatch => {
  return {
    loadHistory: () => {
      return dispatch(getOrderHistoryThunk())
    }
  }
}
export const ConnectedOrderHistory = connect(mapState, mapDispatch)(
  OrderHistory
)
