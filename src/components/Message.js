import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { messageSelectToggled } from '../actions'

//  import action creator

// needs to be connected component
//  mapDispatchToProps + bindActionCreators
//  call this.props.(function)

//const Message = (props) => {
class Message extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props)

        // bind the event handlers to the appropriate context
        this.handleMessageCheckboxClick  = this.handleMessageCheckboxClick.bind(this)
        this.handleStarClick = this.handleStarClick.bind(this)
    }

/*
      // Props changed, so prepare to render the message
      componentWillReceiveProps(nextProps) {
        this.prepareToRender()
      }
*/
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
        //selectedMessages[theIndex].checked = selectedMessages[theIndex].checked === true ? false : true

        //callback, pass message
        this.props.callbackFromParent(theMessage)
    }

    //  Toggle the className when the star is clicked
    handleStarClick = () => {
        var starClassName   //= (this.state.starredClassName === "star fa fa-star" ? "star fa fa-star-o" : "star fa fa-star")
        var isStarred

        if (this.state.starredClassName === "star fa fa-star") {
            //  was checked, now unchecked
            starClassName = "star fa fa-star-o"
            isStarred = false
        } else {
            // was unchecked, now checked
            starClassName = "star fa fa-star"
            isStarred = true
        }

        this.setState({
            'starredClassName': starClassName
        })

        //  Call back to parent
        this.props.callbackFromMessageListHandleStarClick(this.props.message.id, isStarred)
    }


    render () {
      //  build the message (<tr>) className based on characteristics of the message
      var readClassName = "row message"
      readClassName += (this.props.message.read    ? " read"     : " unread")
      readClassName += (this.props.message.checked ? " selected" : "")

      var starredClassName =  this.props.message.starred ? "star fa fa-star"  : "star fa fa-star-o"
      var messageChecked   =  this.props.message.checked

      return (
        <div id={ "message" + this.props.message.id } className={ readClassName }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={ messageChecked } onClick={ this.handleMessageCheckboxClick } />
              </div>
              <div className="col-xs-2">
                <i className={ starredClassName } onClick={ this.handleStarClick }></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            { this.props.message.labels.map(label => <span key={label} className="label label-warning">{label}</span>) }
            { this.props.message.subject }
          </div>
        </div>
      )}
}
//         <div className={this.state.readClassName }>

const mapStateToProps = state => ({
  //messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
//  messageAdded: createMessage,
  callbackFromParent: messageSelectToggled,
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)


//console.log(JSON.stringify(messages))

