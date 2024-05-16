import React from 'react'
import './Tickets.css';


const Tickets = ({state, send}) => {

  const passengers = state.context.passengers;

  const finish = () => {
    send('FINISH')
  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description'>Gracias por volar con Rodriguez Airlines 💚</p>
      <div className='Tickets-ticket'>
        <h2 className='Tickets-title'>Tu vuelo</h2>
        <div className='Tickets-info'>
          <p>{state.context.initialDate}</p>
          <div className="Tickets-country">
            <span className='Tickets-icon'>✈</span>
            <p><b>{state.context.selectedOrigin}</b> a <b>{state.context.selectedDestiny}</b></p>
          </div>
        </div>
        {state.context.finalDate && 
          <div className='Tickets-info'>
            <p>{state.context.finalDate}</p>
            <div className="Tickets-country">
              <span className='Tickets-icon back'>✈</span>
              <p><b>{state.context.selectedDestiny}</b> a <b>{state.context.selectedOrigin}</b></p>
              </div>
            </div>
        }
        <div className='Tickets-info'>
          <p><b>{passengers.length} {passengers.length >= 2 ? ("pasajeros") : ("pasajero")}</b></p>
          <div className="Tickets-passengers">
            {passengers.map((passenger => <p key={passenger} className='Tickets-passenger'>{passenger}</p>))}
          </div>
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  )
}

export default Tickets