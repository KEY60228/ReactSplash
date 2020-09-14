import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'
import { setCode } from '../stores/error'

const PhotoDetail = () => {
  const dispatch = useDispatch()
  const { id }: { id: any } = useParams()
  const [photo, setPhoto]: [any, any] = useState(null)
  const [commentContent, setCommentContent]: [any, any] = useState('')
  const [commentErrors, setCommentErrors]: [any, any] = useState(null)

  const fetchPhoto = async() => {
    const response = await window.axios.get(`https://localhost:1443/api/photos/${id}`)

    if (response.status !== OK) {
      dispatch(setCode(response.status))
    }

    setPhoto(response.data)
  }

  const addComment = async(ev: any) => {
    ev.preventDefault()

    const response = await window.axios.post(`https://localhost:1443/api/photos/${id}/comments`, {
      content: commentContent
    })

    if (response.status === UNPROCESSABLE_ENTITY) {
      setCommentErrors(response.data.errors)
      return false
    }

    setCommentContent('')
    setCommentErrors(null)

    if (response.status !== CREATED) {
      dispatch(setCode(response.status))
      return false
    }
  }

  interface State {
    auth: any
  }
  const isLogin = useSelector((state: State) => state.auth.user)

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
            { isLogin &&
              <form className="form" onClick={addComment}>
                { commentErrors &&
                  <div className="errors">
                    <ul>
                      { commentErrors.content &&
                        commentErrors.content.map((msg: any, index: any) => {
                          <li key={index}>{ msg }</li>
                        })
                      }
                    </ul>
                  </div>
                }
                <textarea className="form__item" onChange={setCommentContent}></textarea>
                <div className="form__button">
                  <button type="submit" className="button button--inverse">submit comment</button>
                </div>
              </form>
            }
          </div>
        </div>
      }
    </>
  )
}

export default PhotoDetail