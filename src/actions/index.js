//  constants indicating state/status after the actions complete
export const MESSAGES_RECEIVED             = "MESSAGES_RECEIVED"
export const MESSAGE_CREATED               = "MESSAGE_CREATED"
export const MESSAGE_SELECT_TOGGLED        = "MESSAGE_SELECT_TOGGLED"
export const MESSAGE_STAR_TOGGLED          = "MESSAGE_STAR_TOGGLED"
export const MESSAGES_SELECT_ALL_TOGGLED   = "MESSAGES_SELECT_ALL_TOGGLED"
export const MESSAGES_MARK_AS_READ_TOGGLED = "MESSAGES_MARK_AS_READ_TOGGLED"
export const MESSAGES_APPLY_LABEL          = "MESSAGES_APPLY_LABEL"
export const MESSAGES_DELETE               = "MESSAGES_DELETE"

//  get all messages
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch("/api/messages")
    const json = await response.json()
//console.log("msg " + JSON.stringify(json._embedded.messages, null, 4))

    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

//  new message added via form
export function createMessage(message) {
  return async (dispatch) => {
    try {
        const response = await fetch('/api/messages/', {
                  method: 'POST',
                  body: JSON.stringify(message),
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  }
                })
        const createdMessage = await response.json()

        dispatch({
          type: MESSAGE_CREATED,
          message: createdMessage,
    })
  } catch (e) {
    console.log("error " + JSON.stringify(e))
  }
 }
}

//  Message checkbox clicked
//  This is UI behavior only, no need to save the message
export function messageSelectToggled(message) {
  return (dispatch) => {
        dispatch({
          type: MESSAGE_SELECT_TOGGLED,
          message: message,
        })
  }
}

//  Select All button clicked on ToolBar
//  This is UI behavior only, no need to save the message
export function messagesSelectAllToggled(messages) {
  return (dispatch) => {
        dispatch({
          type: MESSAGES_SELECT_ALL_TOGGLED,
          messages: messages,
        })
  }
}

//  Message star clicked, save it
export function messageStarToggled(message) {
        console.log("message " + JSON.stringify(message, null, 4))
  return async (dispatch) => {
    var apiMessage = {
            "messageIds" : [ message.id ],
            "command"    : "star",
            "star"       : message.starred,
    }

    try {
        const response = await fetch('/api/messages', {
          method: 'PATCH',
          body: JSON.stringify(apiMessage),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })

        //  should return a 200, OK
        const theResponse = await response.ok

        console.log(theResponse ? "it worked!" : "there was a problem")

        dispatch({
          type: MESSAGE_STAR_TOGGLED,
          message: message,
    })
  } catch (e) {
    console.log("error " + JSON.stringify(e))
  }
 }
}

export function messagesMarkAsReadToggled(theIDs, isRead, messages) {
    var apiMessage = {
        "messageIds" : theIDs,
        "command"    : "read",
        "read"       : isRead,
    }

    return async (dispatch) => {
        try {
            const response = await fetch('/api/messages', {
              method: 'PATCH',
              body: JSON.stringify(apiMessage),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }
            })

            //  should return a 200, OK
            const theResponse = await response.ok
            console.log(theResponse ? "saveMessage worked!" : "There was a problem with saveMessage")

            dispatch({
              type: MESSAGES_MARK_AS_READ_TOGGLED,
              messages: messages,
            })

        } catch (e) {
        console.log("error " + JSON.stringify(e))
        }
    }
}


export function messagesApplyLabel(messageIds, theLabel, addLabel, messages) {
    var apiMessage = {
        "messageIds" : messageIds,
        "command"    : addLabel ? "addLabel" : "removeLabel",
        "label"      : theLabel,
    }

    return async (dispatch) => {
        try {
            const response = await fetch('/api/messages', {
              method: 'PATCH',
              body: JSON.stringify(apiMessage),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }
            })

            //  should return a 200, OK
            const theResponse = await response.ok
            console.log(theResponse ? "applyLabel worked!" : "There was a problem with applyLabel")

            dispatch({
              type: MESSAGES_APPLY_LABEL,
              messages: messages,
            })

        } catch (e) {
            console.log("error " + JSON.stringify(e))
        }
    }
}

export function messagesDelete(messageIds, messages) {
    var apiMessage = {
        "messageIds" : messageIds,
        "command"    : "delete",
    }

    return async (dispatch) => {
        try {
            const response = await fetch('/api/messages', {
              method: 'PATCH',
              body: JSON.stringify(apiMessage),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }
            })

            //  should return a 200, OK
            const theResponse = await response.ok
            console.log(theResponse ? "messagesDelete worked!" : "There was a problem with messagesDelete")

            dispatch({
              type: MESSAGES_DELETE,
              messages: messages,
            })

        } catch (e) {
            console.log("error " + JSON.stringify(e))
        }
    }
}



















