import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, MESSAGE_CREATED } from '../actions'

function messages(state = { all: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
console.log(JSON.stringify(action.messages))
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
    default:
      return state
  }
}


export default combineReducers({
  messages,
})