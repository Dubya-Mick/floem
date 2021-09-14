import React from 'react'
import './sideNav.scss'

function SideNav({ 
  toggleSideNavDisplay, 
  sideNavDisplay, 
  titles, 
  handleSetActivePoem,
  handleAddPoem,
}) {

  const titleList = titles.map((title, index) => (
    <div
      className="title"
      onClick={() => handleSetActivePoem(title.id)}
      key={index}
    >
      {title.title}
    </div>
  ))

  return (
    <div className={`side-nav ${sideNavDisplay ? 'displayed' : ''}`}>
      <button onClick={() => toggleSideNavDisplay()}>Close</button>
      {titleList}
      <button onClick={() => handleAddPoem()}>Add New Poem</button>
    </div>
  )
}

export default SideNav
