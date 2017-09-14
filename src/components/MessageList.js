import React from 'react'
import Message from '../components/Message'

class MessageList extends React.Component {


    render () {
        return (
            <div>
              { this.props.messages.map(message => <Message key={ message.id } message={ message } />) }
            </div>
        )
    }
}

export default MessageList


/*
App
<Calculator>
    handleCelsiusChange
        setState
    handleFarenheitChange
        setState

    render()
        <TemperatureInput onTemperatureChange=this.handleCelsiusChange>
        <TemperatureInput onTemperatureChange=this.handleFarenheitChange>
</Calculator>

toolbar and messageList
<TemperatureInput>
    handleChange(e)
        this.props.onTemperatureChange(e.target.value)

    <input onChange={this.handleChange} />

*/