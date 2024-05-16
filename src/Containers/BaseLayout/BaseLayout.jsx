import { useMachine } from '@xstate/react'
import bookingMachine from '../../Machines/bookingMachine'
import React from 'react'
import './BaseLayout.css';
import StepsLayout from '../StepsLayout/StepsLayout';
import Nav from '../../Components/Nav/Nav';

const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send}/>
    </div>
  )
}

export default BaseLayout