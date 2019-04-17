import React from 'react'
import {connect} from 'react-redux'
import {getAllItems, getItemsByCat} from '../store/item'
import ItemThumbnail from './ItemThumbnail'

class List extends React.Component {
  constructor() {
    super()
    // this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.loadAllItems()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return true
    }
  }

  // handleClick(event) {
  //   console.log('you just clicked: ', event.key)
  //   let id = event.key
  //   this.props.history.push(`/items/${id}`)
  // }

  render() {
    const {list} = this.props
    return (
      <div>
        <div className="title is-2 has-text-centered">LIST OF ITEMS</div>
        <div className="columns is-centered is-multiline">
          {list.map(item => {
            return <ItemThumbnail key={item.id} item={item} />
          })}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    list: state.list
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadAllItems: () => {
      return dispatch(getAllItems())
    }
  }
}

export const AllItems = connect(mapState, mapDispatch)(List)
