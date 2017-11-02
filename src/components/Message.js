import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { messageSelectToggled, messageStarToggled } from '../actions'

//  import action creator

// needs to be connected component
//  mapDispatchToProps + bindActionCreators
//  call this.props.(function)

class Message extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props)
    }


    //  Toggle style (selected) when the div is clicked
    //  and check the checkbox when selected, uncheck when not de selected
    handleMessageCheckboxClick = () => {
        //  get the className of the current class
        var currentClassName = document.getElementById("message" + this.props.message.id).className

        //  if it is selected classname will have "selected" in it.  In that case remove it
        //  if not, add " selected" to className
        var toggledClassName = (currentClassName.includes("selected") ? currentClassName.slice(0, -9) : currentClassName + " selected")

        //  update the className
        document.getElementById("message" + this.props.message.id).className = toggledClassName;

        //  checkbox was clicked, so toggle the checked property of the message
        var theMessage = this.props.message
        theMessage.checked = this.props.message.checked === true ? false : true

        //callback, pass message
        this.props.handleSelectToggled(theMessage)
    }

    //  Toggle the className when the star is clicked
    handleStarClick = () => {
        //  get the className of the current class
        //  if it is starred classname will have "-o" in it.  In that case remove it
        //  if not, add "-o" to className
        var currentClassName = document.getElementById("starred" + this.props.message.id).className
        var toggledClassName = (currentClassName.includes("-o") ? currentClassName.slice(0, -2) : currentClassName + "-o")

        //  update the className
        document.getElementById("starred" + this.props.message.id).className = toggledClassName

        //  star was clicked, so toggle the starred property of the message
        var theMessage = this.props.message
        theMessage.starred = this.props.message.starred === true ? false : true

        //  Call back to parent
        this.props.handleStarClick(theMessage)
    }

    render () {
      //var messageID = currentClassName.slice(0, -9)
      //var theMessage = this.props.messages
      //  build the message (<tr>) className based on characteristics of the message
      var readClassName = "row message"
      readClassName += (this.props.message.read    ? " read"     : " unread")
      readClassName += (this.props.message.checked ? " selected" : "")

      var starredClassName =  this.props.message.starred ? "star fa fa-star"  : "star fa fa-star-o"
      var messageChecked   =  this.props.message.checked


      return (
        ( this.props.message !== undefined) ? (
            <div id={ "message" + this.props.message.id } className={ readClassName }>
              <div className="col-xs-1">
                <div className="row">
                  <div className="col-xs-2">
                    <input type="checkbox" checked={ messageChecked } onClick={ this.handleMessageCheckboxClick } />
                  </div>
                  <div className="col-xs-2">
                    <i id={ "starred" + this.props.message.id } className={ starredClassName } onClick={ this.handleStarClick }></i>
                  </div>
                </div>
              </div>
              <div className="col-xs-11">
                { this.props.message.labels.map(label => <span key={label} className="label label-warning">{label}</span>) }
                { this.props.message.subject }
              </div>
            </div>
        ) : (<div>Loading the message...</div>)

      )}
}

const mapStateToProps = state => ({
  messages: state.messages.all,
})

const mapDispatchToProps = dispatch => bindActionCreators({
//  messageAdded: createMessage,
  handleSelectToggled: messageSelectToggled,
  handleStarClick:     messageStarToggled
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)


//console.log(JSON.stringify(messages))

