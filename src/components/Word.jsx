import React from 'react'
import './word.scss'

function Word({ word, handleSingleWordSpin }) {

  return (
    <div 
      className={`box ${word.spin ? "" : "paused"}`}
      onClick={() => handleSingleWordSpin(word.id)}
    >
      {word.text}
    </div>
  )
}

export default Word
