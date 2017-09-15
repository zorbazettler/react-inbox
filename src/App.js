import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'

class App extends Component {
    constructor (props) {
        super(props);

        // bind the callback method to the proper context TODO: research to fully understand this
        this.callbackFromToolBarToggleSelect = this.callbackFromToolBarToggleSelect.bind(this)
        this.callbackFromMessageCheckClicked = this.callbackFromMessageCheckClicked.bind(this)
        this.callbackFromToolBarToggleRead   = this.callbackFromToolBarToggleRead.bind(this)

        //  Initialize state
        this.state = {
            "messages" : this.props.messages,   // TODO: don't set state with props, apparently an anti-pattern
            "selectButtonClassName" : "fa fa-minus-square-o"
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
            "messages"  : readMessages,
        })
    }


  render() {
    return (
        <div>
          <ToolBar
            buttonClassName={ this.state.selectButtonClassName }
            callbackFromParent={ this.callbackFromToolBarToggleSelect }
            callbackFromToolBarToggleRead={ this.callbackFromToolBarToggleRead }
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