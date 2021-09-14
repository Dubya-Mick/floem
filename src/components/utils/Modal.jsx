import React from 'react'
import Add from './Add.jsx'
import Delete from './Delete.jsx'

function Modal({ modalDisplay }) {

  if (modalDisplay === '') return null;

  return (
    <div>
      {
        modalDisplay === 'add' ?
        <Add /> :
        modalDisplay === 'delete' ?
        <Delete /> :
        null

      }
    </div>
  )
}

export default Modal
