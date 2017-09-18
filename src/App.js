import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'

class App extends Component {
    constructor (props) {
        super(props);

        // bind the callback method to the proper context TODO: research to fully understand this
        this.callbackFromToolBarToggleSelect   = this.callbackFromToolBarToggleSelect.bind(this)
        this.callbackFromMessageCheckClicked   = this.callbackFromMessageCheckClicked.bind(this)
        this.callbackFromToolBarToggleRead     = this.callbackFromToolBarToggleRead.bind(this)
        this.callbackFromTooBarApplyLabel      = this.callbackFromTooBarApplyLabel.bind(this)
        this.callbackFromToolBarRemoveLabel    = this.callbackFromToolBarRemoveLabel.bind(this)
        this.callbackFromToolBarDeleteMessages = this.callbackFromToolBarDeleteMessages.bind(this)

        //  Initialize state
        this.state = {
            "messages" : this.props.messages,   // TODO: don't set state with props, apparently an anti-pattern
            "selectButtonClassName" : "fa fa-minus-square-o",
            "unreadMessageCount"    : (this.props.messages.filter(message => message.read === false)).length
        }
    }


    //  The ToolBar's select/deselect all button was clicked
    callbackFromToolBarToggleSelect = () => {
        var checkedMessages   = this.state.messages.filter(message => message.checked === true)
        var selectedMessages  = []
        var checkStatus
        var theButtonClassName

       //  If all of the messages are selected, unselect all
        if (checkedMessages.length === this.state.messages.length) {
            checkStatus = false
            theButtonClassName = "fa fa-square-o"
        } else {
            //  select all
            checkStatus = true
            theButtonClassName = "fa fa-check-square-o"
        }

        //  set the checked property for all messages
        this.state.messages.forEach(message => {
          message.checked = checkStatus

          selectedMessages.push(message)
        })

        //  Trigger a re-render of child components to reflect UI changes
        this.setState({
            "messages"  : selectedMessages,
            "selectButtonClassName" : theButtonClassName,
        })
    }

    //  a message was checked/clicked, set the state to re render
    callbackFromMessageCheckClicked = (theID) => {
        var theButtonClassName = "fa fa-minus-square-o"
        var selectedMessages = this.state.messages

        //  Find the message in the array by the input ID
        var theIndex = selectedMessages.findIndex(message => message.id === theID)


        //  checkbox was clicked, so toggle the checked property of the message
        selectedMessages[theIndex].checked = selectedMessages[theIndex].checked === true ? false : true

        //  determine checked button className
        //  create an array of all messages that are checked and unchecked
        var checkedMessages   = selectedMessages.filter(message => message.checked === true)
        var unCheckedMessages = selectedMessages.filter(message => message.checked === false)

        //  Set the button class name if all or no messages checked
        if (checkedMessages.length === 0) {
            //  No messages checked
            theButtonClassName = "fa fa-square-o"
        } else if (unCheckedMessages.length === 0) {
            //  All messages checked
            theButtonClassName = "fa fa-check-square-o"
        }


        //  set the state with button className to trigger a re render of the button
        this.setState({
            "selectButtonClassName" : theButtonClassName,
            "messages"              : selectedMessages
        })
    }

    //  Mark As Read or MarkAsUnread button clicked in Toolbar
    //  if readStatus ==  true then Mark As Read clicked if false Mark As Unread clicked
    callbackFromToolBarToggleRead = (readStatus) => {
        var readMessages = []

        //  set the checked property for all selected messages
        this.state.messages.forEach(message  => {

        if (message.checked) {
            message.read = readStatus
          }
          readMessages.push(message)
        })

        this.setState({
            "messages"           : readMessages,
            "unreadMessageCount" : (this.state.messages.filter(message => message.read === false)).length
        })
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

        //  Loop through the messages.  If checked then administer
        //
        //  if addLabel === true  then add if it doesn't already exist
        //  if addLabel === false then remove if it does exist already
        this.state.messages.forEach(message => {

          //    Message is selected
          if (message.checked) {
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
            "unreadMessageCount" : selectedMessages.length,
            "messages"           : selectedMessages
        })

    }

    callbackFromToolBarDeleteMessages = () => {
        var selectedMessages = []

        //  set the checked property for all selected messages
        this.state.messages.forEach(message  => {

        if (message.checked) {
            //  remove it
          } else {
            selectedMessages.push(message)
          }
        })

        this.setState({
            "messages"           : selectedMessages,
            "unreadMessageCount" : (selectedMessages.filter(message => message.read === false)).length
        })
    }



  render() {
    return (
        <div>
          <ToolBar
            buttonClassName={ this.state.selectButtonClassName }
            callbackFromParent={ this.callbackFromToolBarToggleSelect }
            callbackFromToolBarToggleRead={ this.callbackFromToolBarToggleRead }
            callbackFromTooBarApplyLabel={ this.callbackFromTooBarApplyLabel }
            callbackFromToolBarRemoveLabel={ this.callbackFromToolBarRemoveLabel }
            callbackFromToolBarDeleteMessages={ this.callbackFromToolBarDeleteMessages }
            unreadMessageCount={ this.state.unreadMessageCount }
            messages={ this.state.messages } />

          <MessageList
            callbackFromParent={ this.callbackFromMessageCheckClicked }
            messages={ this.state.messages } />
        </div>
    )
  }
}

export default App;


/*
console.log("the button class name = " + theButtonClassName
            + "   checkedMessages.length "
            + checkedMessages.length + "  checkedMessages.length === 0? " + (checkedMessages.length === 0)
            + "   UNCHECKED messages.length "
            + unCheckedMessages.length + "  UNCHECKEDMessages.length === 0? " + (unCheckedMessages.length === 0))

console.log("checkedMessages = " + JSON.stringify(checkedMessages))
console.log("UNcheckedMessages = " + JSON.stringify(unCheckedMessages))


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