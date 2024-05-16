import React from 'react'
import './Welcome.css';


const Welcome = ({send}) => {

  const startBooking = () => {
    send('START');
  };

  return (
    <div className='Welcome'>
      <p className='Welcome-title title'>¡Hoy es el día!</p>
      <p className='Welcome-description description'>Compra tu vuelo y conoce un nuevo rincón 
      del mundo, te va a sorprender las maravillas que hay para explorar</p>
      <button onClick={startBooking} className='Welcome-start button'>Comenzar</button>
    </div>
  )
}

export default Welcome