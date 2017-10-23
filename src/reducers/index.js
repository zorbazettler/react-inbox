import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED,
         MESSAGE_CREATED,
         MESSAGE_SELECT_TOGGLED,
         MESSAGE_STAR_TOGGLED
       } from '../actions'

function messages(state = { all: [] }, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
//console.log("action " + JSON.stringify(action.messages, null, 4))
        var theReturn = {
                       ...state,
                       all: action.messages
                     }
        return theReturn

    case MESSAGE_CREATED:
      return {
        ...state,
        all: [
          action.message,
          ...state.all,
        ]
      }
    case MESSAGE_SELECT_TOGGLED:
    case MESSAGE_STAR_TOGGLED:
      var updatedMessages = []

      state.all.forEach(message => {
          if (message.id === action.message.id) {
            updatedMessages.push(action.message)
          } else {
            updatedMessages.push(message)
          }
      })

//console.log("otherMessages " + JSON.stringify(updatedMessages, null, 4))
      return {
        ...state,
        all: updatedMessages,
      }

    default:
      return state
  }
}


export default combineReducers({
  messages,
})