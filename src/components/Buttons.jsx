import React from 'react'
import './buttons.scss'

function Buttons({ 
  handleToggleSpinAll, 
  newOrder,
  resetPoem,
  toggleStutter, 
  newPoem, 
  poemInput,
  isStuttering 

}) {
  return (
    <div className='buttons'>
      <button className="button" onClick={() => newOrder()}>New Order</button>
      <button className="button" onClick={() => handleToggleSpinAll()}>Toggle Spin</button>
      <button className="button" onClick={() => resetPoem()}>Reset</button>
      <button 
        className={`button ${isStuttering ? 'active' : ''}` }
        onClick={() => toggleStutter()}
        >Stutter
      </button>
      <button className="button" type="submit" onClick={() => newPoem(poemInput)}>Set Poem</button>
    
    </div>
  )
}

export default Buttons
