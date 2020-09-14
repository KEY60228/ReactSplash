import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { OK } from '../util'
import { setCode } from '../stores/error'

const PhotoDetail = () => {
  const dispatch = useDispatch()
  const { id }: { id: any } = useParams()
  const [photo, setPhoto]: [any, any] = useState(null)
  const [commentContent, setCommentContent]: [any, any] = useState('')

  const fetchPhoto = async() => {
    const response = await window.axios.get(`https://localhost:1443/api/photos/${id}`)

    if (response.status !== OK) {
      dispatch(setCode(response.status))
    }

    setPhoto(response.data)
  }

  const addComment = async(ev: any) => {
    ev.preventDefault()

    const response = await window.axios.post(`/api/photos/${id}/comments`, {
      content: commentContent
    })

    setCommentContent('')
  }

  useEffect(() => {
    fetchPhoto()
  })

  return (
    <>
      <h1>Photo Detail</h1>
      { photo &&
        <div className="photo-detail">
          <figure className="photo-detail__pane photo-detail__image">
            <img src={photo.url} alt="" />
            <figcaption>Posted by { photo.owner.name }</figcaption>
          </figure>
          <div className="photo-detail__pane">
            <button className="button button--like" title="Like photo">
              <i className="icon ion-md-heart"></i>12
            </button>
            <a href={`https://localhost:1443/photos/${photo.id}/download`} className="button" title="Download photo">
              <i className="icon ion-md-arrow-round-down"></i>Download
            </a>
            <h2 className="photo-detail__title">
              <i className="icon ion-md-chatboxes"></i>Comments
            </h2>
            <form className="form" onClick={addComment}>
              <textarea className="form__item" onChange={setCommentContent}>{commentContent}</textarea>
              <div className="form__button">
                <button type="submit" className="button button--inverse">submit comment</button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default PhotoDetail