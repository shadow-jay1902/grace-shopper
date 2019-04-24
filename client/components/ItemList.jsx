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

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props) {
      return true
    }
  }

  handleClick(event) {
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
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="all"
                defaultChecked="true"
                onClick={event => this.handleClick(event)}
              />{' '}
              All Items{' '}
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="sports"
                onClick={event => this.handleClick(event)}
              />{' '}
              Sports{' '}
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="food"
                onClick={event => this.handleClick(event)}
              />{' '}
              Food{' '}
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="clothes"
                onClick={event => this.handleClick(event)}
              />{' '}
              Clothes{' '}
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="collectables"
                onClick={event => this.handleClick(event)}
              />{' '}
              Collectables{' '}
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="hype"
                onClick={event => this.handleClick(event)}
              />{' '}
              Hype{' '}
            </label>
            <label className="radio">
              <input
                type="radio"
                name="category"
                value="miscellaneous"
                onClick={event => this.handleClick(event)}
              />{' '}
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

const mapState = state => {
  return {
    list: state.list
  }
}

const mapDispatch = (dispatch) => {
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
