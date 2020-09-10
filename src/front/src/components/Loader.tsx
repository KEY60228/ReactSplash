import React from 'react'
import ReactDOM from 'react-dom'

const Loader = ({children}: {children: any}) => {
  return (
    <>
      <div className="loader">
        <p className="loading__text">{children}</p>
        <div className="loader__item loader__item--heart"><div></div></div>
      </div>
    </>
  )
}

export default Loader