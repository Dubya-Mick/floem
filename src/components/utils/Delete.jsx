import React from 'react'
import './modal.scss'

function Delete({ hidePoemModal }) {
  return (
    <div 
    className="add-delete"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="input-container">
      <div>
        Are you sure you want to delete PoemName?
      </div>
      <div className="modal-buttons">
        <button 
          className="modal-button"
          onClick={() => {
            hidePoemModal();
          }}
        >
          Delete
        </button>
        <button 
          className="modal-button"
          onClick={() => hidePoemModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default Delete
