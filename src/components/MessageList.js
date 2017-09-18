import React from 'react'
import Message from '../components/Message'

class MessageList extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props)

        // bind the event handlers to the appropriate context
        this.handleMessageCheckboxClick  = this.handleMessageCheckboxClick.bind(this)
    }

    //  This method invoked from Message component when a checkbox is clicked
    //  Pass the messageID to App who will manage propagation to source of truth
    //    and re rendering Toolbar (button style)
    handleMessageCheckboxClick = (messageID) => {
        this.props.callbackFromParent(messageID)
    }

    // Props changed, so prepare to render the message
    componentWillReceiveProps(nextProps) {
    }



    render () {
        return (
            <div>
              { this.props.messages.map(message => <Message
                key={ message.id }
                message={ message }
                callbackFromParent={ this.handleMessageCheckboxClick } />) }
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