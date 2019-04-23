import React from 'react'
import {connect} from 'react-redux'
import {getAllItems, getItemsByCat} from '../store/item'
import ItemThumbnail from './ItemThumbnail'
import history from '../history'

class List extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.loadAllItems()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      return true
    }
  }

  handleClick(event) {
    // this.setState({category: event.target.value})
    if (event.target.value === 'all') {
      this.props.loadAllItems()
      history.push('/items')
    } else {
      this.props.loadItemsByCat(event.target.value)
      history.push(`/items/category/${event.target.value}`)
    }
  }

  render() {
    const {list} = this.props
    return (
      <div>
        <div className="title is-2 has-text-centered">LIST OF ITEMS</div>
        <div className="columns is-centered">
          <div className="control" onClick={event => this.handleClick(event)}>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="all"
                defaultChecked="true"
              />{' '}
              All Items{' '}
            </label>
            <label className="radio">
              <input type="radio" name="category" value="sports" /> Sports{' '}
            </label>
            <label className="radio">
              <input type="radio" name="category" value="food" /> Food{' '}
            </label>
            <label className="radio">
              <input type="radio" name="category" value="clothes" /> Clothes{' '}
            </label>
            <label className="radio">
              <input type="radio" name="category" value="collectables" />{' '}
              Collectables{' '}
            </label>
            <label className="radio">
              <input type="radio" name="category" value="hype" /> Hype{' '}
            </label>
            <label className="radio">
              <input type="radio" name="category" value="miscellaneous" />{' '}
              Miscellaneous{' '}
            </label>
          </div>
        </div>
        <div className="columns is-centered is-multiline">
          {list.map(item => {
            return item.stock && <ItemThumbnail key={item.id} item={item} />
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
    },
    loadItemsByCat: name => {
      return dispatch(getItemsByCat(name))
    }
  }
}

export const AllItems = connect(mapState, mapDispatch)(List)
