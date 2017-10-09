import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, MESSAGE_CREATED, MESSAGE_SELECT_TOGGLED } from '../actions'

function messages(state = { all: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
//console.log("action " + JSON.stringify(action.messages, null, 4))

      return {
        ...state,
        all: action.messages
      }
    case MESSAGE_CREATED:
      return {
        ...state,
        all: [
          action.message,
          ...state.all,
        ]
      }
    case MESSAGE_SELECT_TOGGLED:
console.log("action " + JSON.stringify(action.messages, null, 4))

      return {
        ...state,
        all: [
          action.message,
          ...state.all,
        ]
      }

    default:
      return state
  }
}


export default combineReducers({
  messages,
})