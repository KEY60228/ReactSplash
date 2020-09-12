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
  return (
    <>
      <div className="pagination">
        { currentPage !== 1 &&
          <Link to={`/?page=${currentPage - 1}`} className="button">
            &laquo; prev
          </Link>
        }
        { currentPage !== lastPage &&
          <Link to={`/?page=${currentPage + 1}`} className="button">
            next &raquo;
          </Link>
        }
      </div>
    </>
  )
}

export default Pagination