import './app.scss';
import React, { useState, useEffect, useRef } from 'react'
import uniqid from 'uniqid';
import Header from './components/Header.jsx';
import SideNav from './components/SideNav.jsx';
import MainContainer from './components/MainContainer.jsx';


function App() {

  const [sideNavDisplay, setSideNavDisplay] = useState(false);
  const [poems, setPoems] = useState([]);
  const [activePoemId, setActivePoemId] = useState('');
  const LINE_BREAK = 'LINE_BREAK';


  const handleSetPoems = (userObj) => {
    setPoems(userObj.poems);
    setActivePoemId(userObj.poems[0].id);
  }

  const toggleSideNavDisplay = () => {
    setSideNavDisplay(!sideNavDisplay);
  }

  const handleSetActivePoem = (newActivePoemId) => {
    setActivePoemId(newActivePoemId);
  }


  const initializePoem = (poem) => {

    const wordArray = poem.split(' ');
    const freshPoem = wordArray
      // remove extra spaces included by project gutenber, for example
      .filter(word => word !== '')
      .reduce((newPoem, word) => {
        // if the line break chaarcter iis on the end of the string
        if (word.match(/[\n]$/g)) {
          console.log(word);
          const trimmedWord = word.replace(/\r?\n|\r/g, '');
          console.log(trimmedWord)
          const newWord = {
            id: uniqid(),
            text: trimmedWord,
            spin: false,
          }
          newPoem.push(newWord, LINE_BREAK)
        } 
  
        // if the /n character is stuck between two words/not on the end
        else if (word.match(/\r?\n|\r/g)) {
          const words = word.split('\n');
          console.log(words);
          const word1 = {
            id: uniqid(),
            text: words[0],
            spin: false
          }
          const word2 = {
            id: uniqid(),
            text: words[1],
            spin: false
          }
          newPoem.push(word1, LINE_BREAK, word2);
        }
        
        else {
          newPoem.push({
            id: uniqid(),
            text: word,
            spin: false
          })
        }
      return newPoem;
    }, []);
  
    return freshPoem;
    
    // if there's an active stutter in the background already
  
  }

  const resetPoem = () => {
    const newPoems = poems.map(poem => {
      if (poem.id === activePoemId) {
        const resetPoem = initializePoem(poem.rawPoem);
        return {
          ...poem,
          stanza: resetPoem
        }
      }
      return poem;
    })
    setPoems(newPoems)
  }

  const newPoem = (newPoemInput) => {
    const newPoems = poems.map(poem => {
      if (poem.id === activePoemId) {
        const resetPoem = initializePoem(newPoemInput);
        return {
          ...poem,
          stanza: resetPoem
        }
      }
      return poem;
    })
    setPoems(newPoems)
  }

  const handleSingleWordSpin = (wordId) => {
    const newPoems = poems.map(poem => {
      if (poem.id === activePoemId) {
        const newPoem = poem.stanza.map(word => {
          if (word.id === wordId) {
            return {
              ...word, 
              spin: !word.spin
            }
          } 
          return word;
        });
        return {
          ...poem,
          stanza: newPoem
        };
      }
      return poem;
    });

    setPoems(newPoems);
  }

  const flipSpin = (poem) => {
    return poem.map(word => {
      if (word === LINE_BREAK) return LINE_BREAK;
      return {...word, spin: !word.spin};
    })
  }

  const handleToggleSpinAll = () => {
    const newPoems = poems.map(poem => {
      if (poem.id === activePoemId) {
        const newPoem = flipSpin(poem.stanza);
        return {
          ...poem,
          stanza: newPoem
        }
      }
      return poem;
    })
    setPoems(newPoems);
  }

  const newOrder = () => {
    const newPoems = poems.map(poem => {
      if (poem.id === activePoemId) {
        const newOrderedPoem = poem.stanza
          .map(a => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map(a => a.value);
        return {
          ...poem,
          stanza: newOrderedPoem
        }  
      }
      return poem;
    })

    setPoems(newPoems);
  }


  const titles = poems.map(poem => {
    return {
      title: poem.title,
      id: poem.id
    }
  });



  useEffect(() => {
    const dummyUserObj = {
      username: 'Jimmy',
      poems: [
        {
          rawPoem: `Tiger, tiger, burning bright
          In the forests of the night,
          What immortal hand or eye
          Could frame thy fearful symmetry?`,
          title: 'The Tyger',
          id: uniqid(),
          isStuttering: false,
          stanza:  [
            {id: uniqid(), text: "Tiger,", spin: false},
            {id: uniqid(), text: "tiger,", spin: false},
            {id: uniqid(), text: "burning", spin: true},
            {id: uniqid(), text: "bright", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "In", spin: false},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "forests", spin: false},
            {id: uniqid(), text: "of", spin: true},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "night,", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "What", spin: false},
            {id: uniqid(), text: "immortal", spin: false},
            {id: uniqid(), text: "hand", spin: false},
            {id: uniqid(), text: "or", spin: false},
            {id: uniqid(), text: "eye", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "Could", spin: false},
            {id: uniqid(), text: "frame", spin: true},
            {id: uniqid(), text: "thy", spin: false},
            {id: uniqid(), text: "fearful", spin: false},
            {id: uniqid(), text: "symmetry?", spin: false},
          ]
        },
        {
          title: 'The Tyger2',
          rawPoem: `Tiger, tiger, burning bright
          In the forests of the night,
          What immortal hand or eye
          Could frame thy fearful symmetry?`,
          id: uniqid(),
          isStuttering: false,
          stanza:  [
            {id: uniqid(), text: "Tiger,", spin: true},
            {id: uniqid(), text: "tiger,", spin: false},
            {id: uniqid(), text: "burning", spin: true},
            {id: uniqid(), text: "bright", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "In", spin: false},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "forests", spin: false},
            {id: uniqid(), text: "of", spin: true},
            {id: uniqid(), text: "the", spin: false},
            {id: uniqid(), text: "night,", spin: true},
            LINE_BREAK,
            {id: uniqid(), text: "What", spin: false},
            {id: uniqid(), text: "immortal", spin: false},
            {id: uniqid(), text: "hand", spin: false},
            {id: uniqid(), text: "or", spin: false},
            {id: uniqid(), text: "eye", spin: false},
            LINE_BREAK,
            {id: uniqid(), text: "Could", spin: false},
            {id: uniqid(), text: "frame", spin: true},
            {id: uniqid(), text: "thy", spin: true},
            {id: uniqid(), text: "fearful", spin: false},
            {id: uniqid(), text: "symmetry?", spin: false},
          ]
        }
      ]
    }
    handleSetPoems(dummyUserObj);
  }, [])

  useEffect(() => {
    console.log('active-poem', activePoem);
  }, [activePoem])

  const activePoem = poems.find(poem => poem.id === activePoemId);
  
  


  return (
    <div>
      <Header 
        toggleSideNavDisplay={toggleSideNavDisplay}
      />
      <SideNav 
        toggleSideNavDisplay={toggleSideNavDisplay}
        sideNavDisplay={sideNavDisplay}
        titles={titles}
        handleSetActivePoem={handleSetActivePoem}
      />
      <MainContainer
        activePoem={activePoem ? activePoem : { stanza: [] }}
        handleSingleWordSpin={handleSingleWordSpin}
        handleToggleSpinAll={handleToggleSpinAll}
        newOrder={newOrder}
        resetPoem={resetPoem}
        newPoem={newPoem}
      />
    </div>
  );
}

export default App;
