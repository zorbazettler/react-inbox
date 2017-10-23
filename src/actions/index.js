//  constants indicating state/status after the actions complete
export const MESSAGES_RECEIVED      = "MESSAGES_RECEIVED"
export const MESSAGE_CREATED        = "MESSAGE_CREATED"
export const MESSAGE_SELECT_TOGGLED = "MESSAGE_SELECT_TOGGLED"
export const MESSAGE_STAR_TOGGLED   = "MESSAGE_STAR_TOGGLED"

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
        console.log("response " + theResponse)

        dispatch({
          type: MESSAGE_STAR_TOGGLED,
          message: message,
    })
  } catch (e) {
    console.log("error " + JSON.stringify(e))
  }
 }
}
