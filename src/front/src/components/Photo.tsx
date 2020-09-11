import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Photo = ({item}: {item: any}) => {
  const download = (ev: any) => {
    ev.preventDefault()
  }

  return (
    <>
      <div className="photo">
        <figure className="photo__wrapper">
          <img className="photo__image" src={item.url} alt={`Photo by ${item.owner.name}`} />
        </figure>
        <Link className="photo__overlay" to={`/photos/${item.id}`} title={`View the photo by ${item.owner.name}`}>
          <div className="photo__controls">
            <button className="photo__action photo__action--like" title="Like photo">
              <i className="icon ion-md-heart"></i>12
            </button>
          </div>
          <div className="photo__username">
            { item.owner.name }
          </div>
        </Link>
      </div>
    </>
  )
}

export default Photo