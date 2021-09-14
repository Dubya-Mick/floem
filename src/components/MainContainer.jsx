import React, { useState, useEffect, useRef } from 'react'
import Buttons from './Buttons.jsx';
import Poem from './Poem.jsx';
import PoemInput from './PoemInput.jsx';
import './mainContainer.scss';


function MainContainer({ 
  activePoem, 
  handleSingleWordSpin, 
  handleToggleSpinAll,
  newOrder,
  resetPoem,
  newPoem,
  handleStutter,
  handleToggleStutter,
}) {

  const intervalId = useRef(null);
  const [poemInput, setPoemInput] = useState('');

  const handlePoemInput = (e) => {
    setPoemInput(e.target.value);
  }

  useEffect(() => {
    if (activePoem.isStuttering) {
      const id =  window.setInterval(() => {
          handleStutter();
        }, 500)
      intervalId.current = id;
        return () => window.clearInterval(id);
      } 
  }, [activePoem.isStuttering]);


  return (
    <div className="main-container">
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
        intervalId={intervalId}
        handleToggleStutter={handleToggleStutter}
        isStuttering={activePoem.isStuttering}
      /> 

      <PoemInput 
        handlePoemInput={handlePoemInput}

      />
    </div>
  )
}

export default MainContainer
