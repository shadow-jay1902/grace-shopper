import React from 'react'
import history from '../history'
import {decimalCleaner} from '../utils'

const ItemThumbnail = props => {
  const {item} = props
  return (
    <div
      className="column is-one-fifth-fullhd is-one-third-desktop is-half-tablet"
      onClick={() => history.push(`/items/${item.id}`)}
    >
      <div className="card is-centered">
        <h1 className="title is-3 has-text-centered">{item.name}</h1>
        <figure className="image is-4by3 ">
          <img src={item.photoURLs && item.photoURLs[0]} />
        </figure>
        <div className="is-large is-success is-size-5">
          <strong>${decimalCleaner(item.price * 100)}</strong>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            padding: 1rem;
            margin: 2rem;
            height: 25rem;
          }
          .tag {
            margin-top: 1rem;
          }
        `}
      </style>
    </div>
  )
}

export default ItemThumbnail
