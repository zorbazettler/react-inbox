import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'

class App extends Component {
    constructor (props) {
        super(props);

        // bind the callback method to the proper context TODO: research to fully understand this
        this.callbackSelectAll = this.callbackSelectAll.bind(this)


        this.state = {
            "selectAll" : false
            //"messages"  : this.props.messages   // TODO: don't set state with props, apparently an anti-pattern
        }
    }

    //  Toggle the className when the star is clicked
    callbackSelectAll = () => {
alert("ddd")
        this.setState({
            "selectAll" : true
        })
    }



  render() {
    return (
        <div>
          <ToolBar callbackFromParent={ this.callbackSelectAll }/>
          <MessageList selectAll={ this.state.selectAll } messages={ this.props.messages } />
        </div>
    )
  }
}

export default App;


/*
Can't get cross component communication to work, so adding ToolBar to MessageList for now

    return (
        <div>
          <ToolBar callbackFromParent={ this.callbackSelectAll }/>
          <MessageList selectAll={ this.state.selectAll } messages={ this.props.messages } />
        </div>
    )

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