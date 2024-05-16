import React from 'react'
import './StepsLayout.css';
import Welcome from '../../Components/Welcome/Welcome';
import Search from '../../Components/Search/Search';
import Tickets from '../../Components/Tickets/Tickets';
import Passengers from '../../Components/Passengers/Passengers';

const StepsLayout = ({state, send}) => {

  const renderContent = () => {
    if(state.matches('initial')) return <Welcome send={send}/>;
    if(state.matches('search')) return <Search state={state} send={send}/>;
    if(state.matches('tickets')) return <Tickets state={state} send={send} />;
    if(state.matches('passengers')) return <Passengers state={state} send={send} />;
    return null;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  )
}

export default StepsLayout