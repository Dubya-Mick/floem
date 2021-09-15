import React, { useState } from 'react'
import './modal.scss'

function Add({  
  handleAddPoem,
  hidePoemModal
}) {

  const [titleInput, setTitleInput] = useState('');

  const handleTitleInput = (e) => {
    setTitleInput(e.target.value);
  }

  return (
    <div 
      className="add-delete"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="input-container">
        <input 
          type="text" 
          className="poem-title-input"
          onChange={(e) => handleTitleInput(e)}
        />
        <div className="modal-buttons">
          <button 
            className="modal-button"
            onClick={() => {
              handleAddPoem(titleInput);
              hidePoemModal();
            }}
          >
            Add Poem
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

export default Add
