import React from 'react'
import './poemInput.scss'

function PoemInput({ handlePoemInput }) {
  return (
    <div>
      <textarea
        className="poem-input"
        onChange={(e) => {
          handlePoemInput(e)
        }}
      >

      </textarea>
    </div>
  )
}

export default PoemInput
