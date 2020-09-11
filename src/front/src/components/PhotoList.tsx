import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'

import Photo from './Photo'
import { setCode } from '../stores/error'
import { OK } from '../util'

const PhotoList = () => {
  const dispatch = useDispatch()
  const [photos, setPhotos]: [any, any] = useState([]);

  const fetchPhotos = async() => {
    const response = await window.axios.get('https://localhost:1443/api/photos')

    if (response.status !== OK) {
      dispatch(setCode(response.status))
      return false
    }

    setPhotos(response.data.data)
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <>
      <div className="photo-list">
        <div className="grid">
          { photos.map((photo: any, index: any) => {
            return (<Photo key={index} item={photo} />)
          })}
        </div>
      </div>
    </>
  )
}

export default PhotoList
