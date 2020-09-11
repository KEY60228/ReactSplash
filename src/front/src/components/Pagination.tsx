import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

const Pagination = ({
  currentPage,
  lastPage
}: {
  currentPage: number,
  lastPage: number
}) => {
  const isFirstPage = () => {
    return currentPage === 1
  }

  const isLastPage = () => {
    return currentPage === lastPage
  }

  return (
    <>
      <div className="pagination">
        { !isFirstPage &&
          <Link to={`/?page=${currentPage - 1}`} className="button">
            &laquo; prev
          </Link>
        }
        { !isLastPage &&
          <Link to={`/?page=${currentPage + 1}`} className="button">
            next &raquo;
          </Link>
        }
      </div>
    </>
  )
}

export default Pagination