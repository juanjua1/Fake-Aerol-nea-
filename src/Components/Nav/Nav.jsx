import React from 'react'
import './Nav.css';


const Nav = ({state, send}) => {

  const goToWelcome = () => {
    send('CANCEL');
  }

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Rodriguez Airlines ✈</h1>
      {!state.matches('initial') && !state.matches('tickets') &&
        <button onClick={goToWelcome} className='Nav-cancel button-secondary'>Cancelar</button>
      }
    </nav>
  )
}

export default Nav