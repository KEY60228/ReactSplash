import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Photo from './Photo'
import { setCode } from '../stores/error'
import { OK } from '../util'
import Pagination from './Pagination'

const PhotoList = () => {
  const dispatch = useDispatch()
  const [photos, setPhotos]: [any, any] = useState([]);
  const [currentPage, setCurrentPage]: [any ,any] = useState(1)
  const [lastPage, setLastPage]: [any, any] = useState(1)

  const useQuery = () => {
    const location = useLocation();

    if (!location.search) {
      return 'page=1'
    }

    return location.search
  }

  const query = useQuery()

  const fetchPhotos = async(page: any) => {
    const response = await window.axios.get(`https://localhost:1443/api/photos/?${query}`)

    if (response.status !== OK) {
      dispatch(setCode(response.status))
      return false
    }

    
    setPhotos(response.data.data)
    setCurrentPage(response.data.current_page)
    setLastPage(response.data.last_page)
  }

  useEffect(() => {
    fetchPhotos(query)
  }, [query])

  return (
    <>
      <div className="photo-list">
        <div className="grid">
          { photos.map((photo: any, index: any) => {
            return (<Photo key={index} item={photo} />)
          })}
        </div>
      </div>
      <Pagination currentPage={currentPage} lastPage={lastPage} />
    </>
  )
}

export default PhotoList
