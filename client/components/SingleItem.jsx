import React from 'react'
import {connect} from 'react-redux'
import {getSelectItem} from '../store/item'

class Item extends React.Component {
  componentDidMount() {
    this.props.loadSingleItem()
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <h1 className="title is-1">{item.name}</h1>
        <img src={item.photoURLs && item.photoURLs[0]} />
        <p>{item.description}</p>
        <div>${item.price}</div>
        <div>Category: {item.category}</div>
        <button>ADD TO CART</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
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
    }
  }
}

export const SingleItem = connect(mapState, mapDispatch)(Item)
