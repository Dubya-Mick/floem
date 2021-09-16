import './app.scss';
import React, { useState, useEffect, useRef } from 'react'
import uniqid from 'uniqid';
import Header from './components/Header.jsx';
import SideNav from './components/SideNav.jsx';
import Modal from './components/utils/Modal.jsx';
import MainContainer from './components/MainContainer.jsx';
import { dummyUserObj } from './dummyData';


function App() {

  const [sideNavDisplay, setSideNavDisplay] = useState(false);
  const [modalDisplay, setModalDisplay] = useState('');
  const [poems, setPoems] = useState([]);
  const [activePoemId, setActivePoemId] = useState('');
  const idOfPoemToDelete = useRef(null);
  const LINE_BREAK = 'LINE_BREAK';


  const fetchNewPoemsToDb = (poems) => {
    return fetch('/users/?username=Jixon', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(poems)
    })
      .then(data => data.json())
      .then( ({ poems }) => {
        return poems
      })
  }

  const handleSetPoems = (userObj) => {
    setPoems(userObj.poems);
    setActivePoemId(userObj.poems[0]._id);
  }

  const toggleSideNavDisplay = () => {
    setSideNavDisplay(!sideNavDisplay);
  }

  const displayAddPoemModal = () => {
    setModalDisplay('add');
  }

  const displayDeletePoemModal = () => {
    setModalDisplay('delete');
  }

  const hidePoemModal = () => {
    setModalDisplay('');
  }

  const handleSetActivePoem = (newActivePoemId) => {
    setActivePoemId(newActivePoemId);
  }

  const createNewPoem = (title) => {
    return {
      title: title,
      rawPoem: '',
      id: uniqid(),
      isStuttering: false,
      stanza: [],
    }
  }

  const handleAddPoem = (title) => {
    const newPoem = createNewPoem(title);
    const newPoems = [...poems];
    newPoems.push(newPoem);
    setPoems(newPoems);
  }

  const deletePoem = (poemId) => {
    const newPoems = poems.filter(poem => poem._id !== poemId);
    setPoems(newPoems);
  }

  const handleDeletePoem = () => {
    deletePoem(idOfPoemToDelete.current);
    idOfPoemToDelete.current = null;
  }

  const getPoemTitle = (poemId) => {
    const title = poems.reduce((title, poem )=> {
      if (poem._id === poemId) title += poem.title;
      return title;
    }, '')
    return title;
  }

  const handleGetPoemToDeleteTitle = () => {
    return getPoemTitle(idOfPoemToDelete.current);
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
      if (poem._id === activePoemId) {
        const resetPoem = initializePoem(poem.rawPoem);
        return {
          ...poem,
          isStuttering: false,
          stanza: resetPoem
        }
      }
      return poem;
    })
    fetchNewPoemsToDb(newPoems)
      .then(poems => setPoems(poems));

    //setPoems(newPoems)
  }

  const newPoem = (newPoemInput) => {
    console.log(newPoemInput)
    const newPoems = poems.map(poem => {
      if (poem._id === activePoemId) {
        const resetPoem = initializePoem(newPoemInput);
        return {
          ...poem,
          rawPoem: newPoemInput,
          stanza: resetPoem
        }
      }
      return poem;
    })
    fetchNewPoemsToDb(newPoems)
      .then(poems => setPoems(poems));
    //setPoems(newPoems)
  }

  const handleSingleWordSpin = (wordId) => {
    const newPoems = poems.map(poem => {
      if (poem._id === activePoemId) {
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

    fetchNewPoemsToDb(newPoems)
      .then(poems => setPoems(poems));

    //setPoems(newPoems);
  }

  const flipSpin = (poem) => {
    return poem.map(word => {
      if (word === LINE_BREAK) return LINE_BREAK;
      return {...word, spin: !word.spin};
    })
  }

  const toggleSpinAll = (poems) => {
    return poems.map(poem => {
      if (poem._id === activePoemId) {
        const newPoem = flipSpin(poem.stanza);
        return {
          ...poem,
          stanza: newPoem
        }
      }
      return poem;
    })
  }

  const handleToggleSpinAll = () => {
    const newPoems = toggleSpinAll(poems);
    console.log('not from db', newPoems);

    fetchNewPoemsToDb(newPoems)
      .then(poems => setPoems(poems));

  }

  const handleStutter = () => {
    setPoems(poems => toggleSpinAll(poems));
  }

  const handleToggleStutter = () => {
    const newPoems = poems.map(poem => {
      if (poem._id === activePoemId) {
        return {
          ...poem,
          isStuttering: !poem.isStuttering,
        }
      }
      return poem;
    })

    fetchNewPoemsToDb(newPoems)
      .then(poems => setPoems(poems));
    //setPoems(newPoems);
  }

  const newOrder = () => {
    const newPoems = poems.map(poem => {
      if (poem._id === activePoemId) {
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

  useEffect(() => {

    fetch('/users/?username=Jixon')
      .then(data => data.json())
      .then(userObj => {
        handleSetPoems(userObj);
      })


    //handleSetPoems(dummyUserObj);
  }, [])

  useEffect(() => {
    console.log(activePoemId);
  }, ['activepoemid', activePoemId])


  // useEffect(() => {
  //   console.log(poems);
  // }, [poems])

  const titles = poems.map(poem => {
    return {
      title: poem.title,
      id: poem._id
    }
  });

  const activePoem = poems.find(poem => poem._id === activePoemId); // change to ._id
  
  console.log(activePoem)


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
        handleAddPoem={handleAddPoem}
        displayAddPoemModal={displayAddPoemModal}
        displayDeletePoemModal={displayDeletePoemModal}
        idOfPoemToDelete={idOfPoemToDelete}
      />
      <MainContainer
        activePoem={activePoem ? activePoem : { stanza: [] }}
        poems={poems}
        handleSingleWordSpin={handleSingleWordSpin}
        handleToggleSpinAll={handleToggleSpinAll}
        newOrder={newOrder}
        resetPoem={resetPoem}
        newPoem={newPoem}
        handleStutter={handleStutter}
        handleToggleStutter={handleToggleStutter}
      />
      <Modal 
        modalDisplay={modalDisplay}
        hidePoemModal={hidePoemModal}
        handleAddPoem={handleAddPoem}
        handleGetPoemToDeleteTitle={handleGetPoemToDeleteTitle}
        handleDeletePoem={handleDeletePoem}
      />
    </div>
  );
}

export default App;
