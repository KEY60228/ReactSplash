import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'

const Message = () => {
  interface State {
    message: any
  }
  const message = useSelector((state: State) => state.message.content)

  return (
    <>
      { message &&
        <div className="message">
          { message }
        </div>
      }
    </>
  )
}

export default Message