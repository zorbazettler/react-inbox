import React from 'react'
import Message from '../components/Message'

//const MessageList = ({messages}) => {
class MessageList extends React.Component {
    constructor (props) {
        super(props);

//        this.state = {
//            "selectAll" : this.props.selectAll,
//            "messages"  : this.props.messages
//        }
    }



    render () {
        return (
            <div>
              { this.props.messages.map(message => <Message key={ message.id } selectAll={ this.props.selectAll } message={ message } />) }
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