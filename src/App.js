import React, { Component } from 'react';
import './App.css';

import ToolBar from './components/ToolBar'
import MessageList from './components/MessageList'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
        <div>
          <ToolBar />

          <MessageList />
        </div>
    )
  }
}



const mapStateToProps = state => ({})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)



