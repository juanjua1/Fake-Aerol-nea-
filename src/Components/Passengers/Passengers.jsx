import React, { useState } from 'react'
import './Passengers.css';


const Passengers = ({state, send}) => {
  const [value, changeValue] = useState('');
  const passengers = state.context.passengers;

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const goToTicket = () => {
    send('DONE')
  }

  const submit = (e) => {
    e.preventDefault();
    send("ADD", { newPassenger: value}); 
    changeValue('');
  }
  
  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      {passengers.length > 0 && (
      <div className='Passengers-list'>
        {passengers.map((passenger => <p key={passenger}>{passenger}</p>))}        
      </div>
      )}
      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button button-secondary'
          type="submit"
          disabled={!value}
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
          disabled={passengers.length === 0}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  )
}

export default Passengers