import React from 'react'
import {connect} from 'react-redux'
import {getSelectItem} from '../store/item'
import history from '../history'
import {getItemOntoCart} from '../store/cart'
import { decimalCleaner } from '../utils';

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      added: false
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleItem()
  }

  handleAdd(event) {
    this.props.addItem(this.props.item)
    this.setState({
      added: true
    })
  }

  render() {
    const {item} = this.props
    return (
      <div className="columns is-centered">
        <div className="column is-one-third container">
          <div className="card">
            <h1 className="title is-1 has-text-centered">{item.name}</h1>
            <div className="columns is-centered">
              <div className="column is-10">
                <figure className="image is-4by3">
                  <img src={item.photoURLs && item.photoURLs[0]} />
                </figure>
              </div>
            </div>
            <div className="columns is-multiline is-vcentered">
              <div className="column is-three-fifths">
                <p>{item.description}</p>
              </div>
              <div className="column is-one-fifth">
                {!this.state.added ? (
                  <button
                    className="button is-small is-info is-rounded"
                    item={item}
                    onClick={event => this.handleAdd(event)}
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    className="button is-small is-success is-info is-rounded"
                    disabled
                  >
                    {' '}
                    ADDED to CART{' '}
                  </button>
                )}

              </div>
              <div className="column has-text-centered is-half">
                <div className="is-large is-success is-size-5">
                  <strong>${decimalCleaner(item.price * 100)}</strong>
                </div>
              </div>
              <div className="column has-text-centered is-half">
                <strong>Category:</strong>
                <br />
                <div className="tag is-rounded has-text-weight-bold is-danger">
                  {item.category}
                </div>
              </div>
            </div>
          </div>
          <button
            className="button backButton is-medium is-primary"
            onClick={() => history.push('/items')}
          >
            Back
          </button>
        </div>
        <style jsx>{`
          .container {
            margin-top: 3rem;
          }
          .card {
            padding: 1rem;
          }
          .backButton {
            margin-top: 1rem;
          }
        `}</style>
      </div>
    )
  }
}

const mapState = state => {
  return {
    item: state.item
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadSingleItem: () => {
      const itemId = ownProps.match.params.id
      return dispatch(getSelectItem(itemId))
    },
    addItem: item => dispatch(getItemOntoCart(item))
  }
}

export const SingleItem = connect(mapState, mapDispatch)(Item)
