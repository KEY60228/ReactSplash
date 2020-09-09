import React from 'react'
import ReactDOM from 'react-dom'

const PhotoForm = () => {
  return (
    <>
      <div className="photo-form">
        <h2 className="title">Submit a Photo</h2>
        <form className="form">
          <input className="form__item" type="file" />
          <div className="form__button">
            <button type="submit" className="button button--inverse">submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PhotoForm