import React from 'react'
import './buttons.scss'

function Buttons({ 
  handleToggleSpinAll, 
  newOrder,
  resetPoem,
  handleToggleStutter, 
  newPoem, 
  poemInput,
  intervalId,
  isStuttering

}) {
  return (
    <div className='buttons'>
      <button className="button" onClick={() => newOrder()}>New Order</button>
      <button className="button" onClick={() => handleToggleSpinAll()}>Toggle Spin</button>
      <button className="button" onClick={() => {
        // clear the stutter interval id on reset
        if (intervalId) {
          clearInterval(intervalId.current)
          intervalId.current = null;
        }
        resetPoem()
        }}
      >
        Reset
      </button>
      <button 
        className={`button ${isStuttering ? 'active' : ''}` }
        onClick={() => handleToggleStutter()}
      >
        Stutter
      </button>
      <button className="button" type="submit" onClick={() => newPoem(poemInput)}>Set Poem</button>
    
    </div>
  )
}

export default Buttons
