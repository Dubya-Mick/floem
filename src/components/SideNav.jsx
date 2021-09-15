import React from 'react'
import './sideNav.scss'

function SideNav({ 
  toggleSideNavDisplay, 
  sideNavDisplay, 
  titles, 
  handleSetActivePoem,
  displayAddPoemModal,
  displayDeletePoemModal,
  idOfPoemToDelete,
}) {

  const titleList = titles.map((title, index) => (
    <div 
      className="title-container"
      key={index}
    >
      <div
        onClick={() => handleSetActivePoem(title.id)}
      >
        {title.title}
      </div>
      <i 
        className="far fa-trash-alt"
        onClick={() => {
          idOfPoemToDelete.current = title.id;
          displayDeletePoemModal()
        }}
      >
      </i>
    </div>
  ))

  return (
    <div className={`side-nav ${sideNavDisplay ? 'displayed' : ''}`}>
      <div className="side-nav-content-container">
        <button onClick={() => toggleSideNavDisplay()}>Close</button>
        {titleList}
        <button onClick={() => displayAddPoemModal()}>Add New Poem</button>
      </div>
    </div>
  )
}

export default SideNav
