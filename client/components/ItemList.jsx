import React from 'react'
import {connect} from 'react-redux'
import {getAllItems, getItemsByCat} from '../store/item'
import ItemThumbnail from './ItemThumbnail'

class List extends React.Component {
  componentDidMount() {
    this.props.loadAllItems()
  }

  render() {
    const {list} = this.props
    return (
      <div>
        <div>LIST OF ITEMS</div>
        {list.map(item => {
          return <ItemThumbnail key={item.id} item={item} />
        })}
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
