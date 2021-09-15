import React from 'react'
import Add from './Add.jsx'
import Delete from './Delete.jsx'
import './modal.scss'

function Modal({ 
  modalDisplay, 
  hidePoemModal,
  handleAddPoem

}) {

  if (modalDisplay === '') return null;

  return (
    <div 
      className="modal"
      onClick={() => hidePoemModal()}
    >
      {
        modalDisplay === 'add' ?
        <Add 
          handleAddPoem={handleAddPoem}
          hidePoemModal={hidePoemModal}
        /> :
        modalDisplay === 'delete'?
        <Delete 
          hidePoemModal={hidePoemModal}
        /> :
        null
      }
    </div>
  )
}

export default Modal
