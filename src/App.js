import React, { Component } from 'react';
import './App.css';

import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'
import { connect } from 'react-redux'

class App extends Component {
    constructor (props) {
        super(props);

        // bind the callback method to the proper context TODO: research to fully understand this
        //this.callbackFromToolBarToggleSelect        = this.callbackFromToolBarToggleSelect.bind(this)
        //this.callbackFromToolBarToggleRead          = this.callbackFromToolBarToggleRead.bind(this)
        this.callbackFromToolBarDeleteMessages      = this.callbackFromToolBarDeleteMessages.bind(this)

    }

/*
    //  Mark As Read or MarkAsUnread button clicked in Toolbar
    //  if readStatus ==  true then Mark As Read clicked if false Mark As Unread clicked
    callbackFromToolBarToggleRead = (readStatus) => {
        var readMessages = []
        var messageIds   = []

        //  set the checked property for all selected messages
        this.state.messages.forEach(message  => {

        //  If message is checked, set the read boolean and
        //  add to the array of checked messages
        if (message.checked) {
            message.read = readStatus
            messageIds.push(message.id)
          }
          readMessages.push(message)
        })

        this.setState({
            "messages"           : readMessages,
            //"unreadMessageCount" : (this.state.messages.filter(message => message.read === false)).length
        })

        var apiMessage = {
            "messageIds" : messageIds,
            "command"    : "read",
            "read"       : readStatus,
        }

        this.saveMessage(apiMessage)
    }


    //  Apply Label button clicked in ToolBar
    callbackFromTooBarApplyLabel = (label) => {
        //  for all selected messages add label if not already there
        this.administerLabel(label, true)
    }

    //  Remove Label button clicked in ToolBar
    callbackFromToolBarRemoveLabel = (label) => {
        //  for all selected messages remove label if already there
        this.administerLabel(label, false)
    }

    //  Add or remove label from message
    administerLabel = (theLabel, addLabel) => {
        var selectedMessages = []
        var messageIds       = []

        //  Loop through the messages.  If checked then administer
        //
        //  if addLabel === true  then add if it doesn't already exist
        //  if addLabel === false then remove if it does exist already
        this.state.messages.forEach(message => {

          //    Message is selected
          if (message.checked) {
              messageIds.push(message.id)

              var labelIndex = message.labels.indexOf(theLabel)

              if (addLabel && labelIndex === -1) {
                //  Adding label and message and does not have the label, add label
                message.labels.push(theLabel)

              } else if (!addLabel && labelIndex !== -1) {
                //  Removing label and message and does have the label, remove label
                message.labels.splice(labelIndex, 1)
              }
          }

          selectedMessages.push(message)
        })

        this.setState({
            //"unreadMessageCount" : selectedMessages.length,
            "messages"           : selectedMessages
        })

        var apiMessage = {
            "messageIds" : messageIds,
            "command"    : addLabel ? "addLabel" : "removeLabel",
            "label"      : theLabel,
        }

        this.saveMessage(apiMessage)
    }
*/
    callbackFromToolBarDeleteMessages = () => {
        var selectedMessages = []
        var messageIds       = []

        //  set the checked property for all selected messages
        this.state.messages.forEach(message  => {

        if (message.checked) {
            //  remove it
            messageIds.push(message.id)

          } else {
            selectedMessages.push(message)
          }
        })

        this.setState({
            "messages"           : selectedMessages,
            //"unreadMessageCount" : (selectedMessages.filter(message => message.read === false)).length
        })

        var apiMessage = {
            "messageIds" : messageIds,
            "command"    : "delete",
        }

        this.saveMessage(apiMessage)
    }

    saveMessage = async(message) => {
        console.log("message = " + JSON.stringify(message, null, 4))

        const response = await fetch('/api/messages', {
          method: 'PATCH',
          body: JSON.stringify(message),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })

        //  should return a 200, OK
        const theResponse = await response.ok

        console.log(theResponse ? "it worked!" : "there was a problem")
    }

  render() {
    return (
        <div>
          <ToolBar
            callbackFromToolBarDeleteMessages={ this.callbackFromToolBarDeleteMessages }
          />

          <MessageList />
        </div>
    )
  }
}
//            callbackFromTooBarApplyLabel={ this.callbackFromTooBarApplyLabel }
//            callbackFromToolBarRemoveLabel={ this.callbackFromToolBarRemoveLabel }



const mapStateToProps = state => ({})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



