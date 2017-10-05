export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch("/api/messages")
    const json = await response.json()
//alert(JSON.stringify(json._embedded.messages))

    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

export const MESSAGE_CREATED = 'MESSAGE_CREATED'
export function createMessage(message) {
  return async (dispatch) => {
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
  }
}