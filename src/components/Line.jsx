import React from 'react'
import Word from './Word.jsx'
import './line.scss'

function Line({ line, handleSingleWordSpin }) {

  const words = line.map((word, index) => {
    return (
      <Word 
        key={index}
        word={word}
        handleSingleWordSpin={handleSingleWordSpin}
      />
    )
  })

  return (
    <div className='line'>
      {words}
    </div>
  )
}

export default Line
