import React, { useState, useEffect, useRef } from 'react'
import Buttons from './Buttons.jsx';
import Poem from './Poem.jsx';
import PoemInput from './PoemInput.jsx';


function MainContainer({ 
  activePoem, 
  handleSingleWordSpin, 
  handleToggleSpinAll,
  newOrder,
  resetPoem,
  newPoem
}) {

  const intervalId = useRef(null);
  const [poemInput, setPoemInput] = useState('');

  const handlePoemInput = (e) => {
    setPoemInput(e.target.value);
  }

  // useEffect(() => {
  //   if (activePoem.isStuttering) {
  //   const id =  window.setInterval(() => {
  //       setStanza(stanza => flipSpin(stanza))
  //     }, 500)
  //     return () => window.clearInterval(id);
  //   } 
  // }, [activePoem.isStuttering]);

  return (
    <div>
      <Poem 
        activePoem={activePoem}
        handleSingleWordSpin={handleSingleWordSpin}
      />

      <Buttons 
        handleToggleSpinAll={handleToggleSpinAll}
        newOrder={newOrder}
        resetPoem={resetPoem}
        poemInput={poemInput}
        newPoem={newPoem}
      /> 

      <PoemInput 
        handlePoemInput={handlePoemInput}

      />
    </div>
  )
}

export default MainContainer
