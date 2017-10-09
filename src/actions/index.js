//  constants indicating state/status after the actions complete
export const MESSAGES_RECEIVED      = "MESSAGES_RECEIVED"
export const MESSAGE_CREATED        = "MESSAGE_CREATED"
export const MESSAGE_SELECT_TOGGLED = "MESSAGE_SELECT_TOGGLED"

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


export function messageSelectToggled(message) {
  return (dispatch) => {
        dispatch({
          type: MESSAGE_SELECT_TOGGLED,
          message: message,
        })
  }
}
