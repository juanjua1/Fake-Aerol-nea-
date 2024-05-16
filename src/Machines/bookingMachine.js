import { assign, createMachine } from 'xstate';
import { fetchCountries } from '../Utils/api';

const fillCountries = { 
  initial: 'loading', 
  states: { 
    loading: {
      invoke: { 
        id: "getCountries", 
        src: () => fetchCountries, 
        onDone: { 
          target: "success", 
          actions: assign({ 
            countries: (context, event) => event.data
          })
        }, 
        onError: { 
          target: "failure",
          actions: assign({
            error: "Fallo el request"
          })
        }       
      }
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: 'loading'}
      }
    }
  }
}


const bookingMachine = createMachine({
  id: 'buy plane tickets',
  initial: 'initial',
  context: {
    passengers: [],
    selectedOrigin: "",
    selectedDestiny: "",
    initialDate: "",
    finalDate: "",
    countries: [], 
    error: "" 
  },
  states: {
    initial: {
      entry: "cleanContext",
      on: {
        START: { 
          target: "search", 
        }
      }
    },
    search: {
      on: {
        CONTINUE: { 
          target: "passengers",
          actions: assign({
            selectedOrigin: (context, event) => event.selectedOrigin,
            selectedDestiny: (context, event) => event.selectedDestiny,
            initialDate: (context, event) => event.initialDate,
            finalDate: (context, event) => event.finalDate,
          })
        },
        CANCEL: {
          target: "initial",
        }
      },
      ...fillCountries 
    },
    passengers: {
      on: {
        DONE: {
          target: "tickets",
          cond: "moreThanOnePassenger" 
        },
        CANCEL: {
          target: "initial",
        },
        ADD: { 
          target: "passengers",
          actions: assign( 
            (context, event) => context.passengers.push(event.newPassenger)
          )
        }
      }
    },
    tickets: {
      /*after: { 
        5000: { 
          target: "initial",
        }
      },*/
      on: {
        FINISH: {
          target: "initial",
        }
      }
    },
  },
}, {
  actions: { 
    cleanContext: assign(context => { 
      context.passengers = [], 
      context.selectedOrigin = "", 
      context.selectedDestiny = "",
      context.initialDate = "",
      context.finalDate = ""
    })
  },
  guards: { 
    moreThanOnePassenger: (context) => {
      return context.passengers.length > 0
    }
  }
}
);

export default bookingMachine;