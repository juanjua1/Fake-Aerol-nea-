import React, { useEffect, useState } from 'react'
import './Search.css';

const Search = ({state, send}) => {
  const [flight, setFlight] = useState({
    origin: "",
    destiny: "",
    initialDate: "", 
    finalDate: "", 
    minDate: new Date().toISOString().split("T")[0],
    valid: false
  });
  const options = state.context.countries;

  const handleSelectOrigin = (event) => {
    setFlight({ ...flight, origin: event.target.value});
  };

  const handleSelectDestiny = (event) => {
    setFlight({ ...flight, destiny: event.target.value});
  };

  const handleInitialDate = (event) => {
    if(event.target.value) {
      if(event.target.value > flight.finalDate) { 
        setFlight({ ...flight, initialDate: event.target.value, finalDate: ""});
      } else {
        setFlight({ ...flight, initialDate: event.target.value});        
      }
    } else {
      setFlight({ ...flight, initialDate: event.target.value, finalDate: ""});
    }
  }

  const handleFinalDate = (event) => {
    setFlight({ ...flight, finalDate: event.target.value});
  }

  const goToPassengers = () => {
    send('CONTINUE', {
      selectedOrigin: flight.origin, 
      selectedDestiny: flight.destiny,
      initialDate: flight.initialDate,
      finalDate: flight.finalDate
    }) 
  }
  useEffect(() => {
    
    if(flight.origin && flight.destiny && flight.initialDate) {
      setFlight({ ...flight, valid: true });
    } else {
      setFlight({ ...flight, valid: false });
    }

  }, [flight.origin, flight.destiny, flight.initialDate]);  

  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>
      <p className='Search-title title'>De</p>
      <select id="origin" className='Search-select' value={flight.origin} onChange={handleSelectOrigin}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((option) => 
          <option value={option.name.common} key={option.name.common}>{option.name.common}</option>
        )}
      </select>
      <p className='Search-title title'>A</p>
      <select id="destiny" className='Search-select' value={flight.destiny} onChange={handleSelectDestiny}>
        <option value="" disabled defaultValue>Escoge un país</option>
        {options.map((option) => 
          <option value={option.name.common} key={option.name.common}>{option.name.common}</option>
        )}
      </select>
      <div className='Search-date'>
        <div className='Search-date-travel'>
          <p className='Search-title title'>Fecha de ida</p>
          <input type="date" min={flight.minDate} value={flight.initialDate} onChange={handleInitialDate}/>
        </div>
        <div className='Search-date-travel'>
          <p className='Search-title title'>Fecha de vuelta</p>
          <input type="date" min={flight.initialDate} value={flight.finalDate} onChange={handleFinalDate} disabled={!flight.initialDate} />
        </div>
      </div>
      <button onClick={goToPassengers} disabled={!flight.valid} className='Search-continue button'>Continuar</button>
    </div>
  )
}

export default Search