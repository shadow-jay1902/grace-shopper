import React from 'react'
import {connect} from 'react-redux'
import {getOrderHistoryThunk} from '../store/order-history'

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
    const {orderHistory} = this.props
    return (
      <div className="main columns is-centered">
        <div className="column has-text-centered is-three-fifths">
          <div className="title is-2">Previous Orders</div>
          <ul>
            {orderHistory ? (
              orderHistory.filter(order => order.items.length).map(order => {
                return (
                  <div className="box" key={order.id}>
                    <p><strong>Ordered On: {order.updatedAt.slice(0, 10)}</strong></p>
                    {order.items.map(item => {
                      return <HistoryItem key={item.id} item={item} />
                    })}
                  </div>
                )
              })
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
