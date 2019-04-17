import React from 'react'

const ItemThumbnail = props => {
  const {item} = props
  return (
    <div>
      <h1 className="title is-3">{item.name}</h1>
      <img src={item.photoURLs && item.photoURLs[0]} />
      <div>${item.price}</div>
    </div>
  )
}

export default ItemThumbnail
