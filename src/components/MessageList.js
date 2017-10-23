import React from 'react'
import Message from '../components/Message'
import { connect } from 'react-redux'


class MessageList extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props)

        // bind the event handlers to the appropriate context
        //this.handleMessageCheckboxClick  = this.handleMessageCheckboxClick.bind(this)
        this.handleStarClick             = this.handleStarClick.bind(this)
    }

    handleStarClick = (messageID, isStarred) => {
        this.props.callbackFromMessageListHandleStarClick(messageID, isStarred)
    }
    render () {
        return (
              ( this.props.messages.all.length !== undefined) ? (
                <div>
                  {
                    this.props.messages.all.map(message => <Message
                    key={ message.id }
                    message={ message }
                    callbackFromMessageListHandleStarClick={ this.handleStarClick } />) }
                </div>
              ) : (<div>Loading the message list...</div>)
        )
    }
}

//  callbackFromParent={ this.handleMessageCheckboxClick }

const mapStateToProps = state => ({
  messages: state.messages,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)


