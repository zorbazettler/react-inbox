import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED,
         MESSAGE_CREATED,
         MESSAGE_SELECT_TOGGLED,
         MESSAGE_STAR_TOGGLED,
         MESSAGES_SELECT_ALL_TOGGLED,
         MESSAGES_MARK_AS_READ_TOGGLED,
         MESSAGES_APPLY_LABEL,
         MESSAGES_DELETE,
       } from '../actions'

    //console.log("action " + JSON.stringify(action.messages, null, 4))
function messages(state = { all: [] }, action) {
    switch (action.type) {
        case MESSAGES_RECEIVED:
           var unreadMessageCount = (action.messages.filter(message => message.read === false)).length
           var theReturn = {
               ...state,
               unreadMessageCount: unreadMessageCount,
               all: action.messages,
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

          //    Update the array of messages:
          //    add the input message to the existing
          //    array of messages, replacing the original
          state.all.forEach(message => {
              if (message.id === action.message.id) {
                updatedMessages.push(action.message)
              } else {
                updatedMessages.push(message)
              }
          })

          return {
            ...state,
            all: updatedMessages,
          }

        //  All messages either selected or unselected, property
        //  set in ToolBar
        //  or mark as read or unread checked
        case MESSAGES_SELECT_ALL_TOGGLED:
        case MESSAGES_MARK_AS_READ_TOGGLED:
        case MESSAGES_APPLY_LABEL:
        case MESSAGES_DELETE:
          return {
            ...state,
            all: action.messages,
          }


        default:
          return state
    }
}


export default combineReducers({
  messages,
})