import React from 'react'
import Message from '../components/Message'
import { connect } from 'react-redux'


class MessageList extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props)
    }

    render () {
    //debugger
        return (
              ( this.props.messages.length !== undefined) ? (
                <div>
                  {
                    this.props.messages.map(message =>
                        <Message key={ message.id } message={ message } />
                    ) }
                </div>
              ) : (<div>Loading the message list...</div>)
        )
    }
}


const mapStateToProps = (state) => ({
  messages: state.messages.all,
  unreadMessageCount: state.messages.unreadMessageCount,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)


