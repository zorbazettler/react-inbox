import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { createMessage } from '../actions'

class ToolBar extends React.Component {
    constructor (props) {
        super(props);

        //  Bind the button click to the appropriate context
        this.handleSelectAllClick    = this.handleSelectAllClick.bind(this)
        this.handleMarkAsReadClick   = this.handleMarkAsReadClick.bind(this)
        this.handleMarkAsUnreadClick = this.handleMarkAsUnreadClick.bind(this)
        this.handleComposeClick      = this.handleComposeClick.bind(this)
        this.handleFormSubmit        = this.handleFormSubmit.bind(this)

        this.state = {
//            "messages"                 : this.props.messages,
//            "selectAllButtonClassName" : this.props.buttonClassName,
            "formDisplay"              : false
        }
    }

    // Props changed, so prepare to render the message
    componentWillReceiveProps(nextProps) {
        //this.setState({"selectAllButtonClassName": this.props.buttonClassName})
    }

    handleComposeClick = () => {
        this.setState({"formDisplay": this.state.formDisplay ? false : true})
    }

    handleFormSubmit = (subject, body, messageAdded) => {
//    handleFormSubmit = () => {
        //this.props.callbackFromToolBarAddMessage(subject, body)
        var apiMessage = {
            "subject" : subject,
            "body"    : body,
        }

        //store.dispatch(createMessage(apiMessage))
        this.props.createMessage(apiMessage)

        this.setState({"formDisplay": false})
    }

    //  When the select all button is clicked call back to App to change state and re render
    handleSelectAllClick = () => {
        this.props.callbackFromParent()
    }

    //  When the Mark As Read button is clicked, call back to App to change state and re-render
    handleMarkAsReadClick = () => {
        this.props.callbackFromToolBarToggleRead(true)
    }

    //  When the Mark As Unread button is clicked, call back to App to change state and re-render
    handleMarkAsUnreadClick = () => {
        this.props.callbackFromToolBarToggleRead(false)
    }

    //  When the Add Label button is clicked
    //  call back to App to administer, change state and re-render
    handleApplyLabelClick = () => {
        var sel = document.getElementById("applyLabelSelect")

        this.props.callbackFromTooBarApplyLabel(sel.options[sel.selectedIndex].value)
    }

    //  When the Remove Label button is clicked
    //  call back to App to administer, change state and re-render
    handleRemoveLabelClick = () => {
        var sel = document.getElementById("removeLabelSelect")


        this.props.callbackFromToolBarRemoveLabel(sel.options[sel.selectedIndex].value)
    }

    handleDeleteClick = () => {
        this.props.callbackFromToolBarDeleteMessages()
    }

    render() {
        var theButtonClassName = "fa fa-minus-square-o"
        var selectedMessages = this.props.messages.all
//console.log("msgs " + JSON.stringify(selectedMessages, null, 4))

        if (selectedMessages.length !== undefined) {
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
        }

        return (
        (selectedMessages.length !== undefined && this.props.messages.all.length !== undefined) ? (
            <div className="row toolbar">
              <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">{ this.props.unreadMessageCount }</span>
                  unread messages
                </p>

                <a className="btn btn-danger" onClick={ this.handleComposeClick }>
                  <i className="fa fa-plus"></i>
                </a>
                <button className="btn btn-default" onClick={ this.handleSelectAllClick }>
                  <i className={ theButtonClassName }></i>
                </button>

                <button className="btn btn-default" onClick={ this.handleMarkAsReadClick }>
                  Mark As Read
                </button>

                <button className="btn btn-default" onClick={ this.handleMarkAsUnreadClick }>
                  Mark As Unread
                </button>

                <select id="applyLabelSelect" className="form-control label-select" onChange={ this.handleApplyLabelClick }>
                  <option>Apply label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>

                <select id="removeLabelSelect" className="form-control label-select" onChange={ this.handleRemoveLabelClick }>
                  <option>Remove label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={ this.handleDeleteClick }>
                  <i className="fa fa-trash-o"></i>
                </button>
              </div>
                { this.state.formDisplay ? <TheForm callbackFromToolBarAddMessage={ this.handleFormSubmit } /> : null }
            </div>
             ) : (<div>Loading the toolbar...</div>)
        )
    }
}

class TheForm extends React.Component {
    constructor (props) {
        super(props);

        //  Bind the button click to the appropriate context
        this.handleFormSubmit        = this.handleFormSubmit.bind(this)
    }

    //  gather the subject & body then call to ToolBar
    handleFormSubmit = (e, messageAdded) => {
        e.preventDefault()
        var subject = document.getElementById("subject").value
        var body    = document.getElementById("body").value

        this.props.callbackFromToolBarAddMessage(subject, body, messageAdded)
    }

render() {
    return(
                <form className="form-horizontal well">
                  <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                      <h4>Compose Message</h4>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                      <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                      <textarea name="body" id="body" className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                      <input type="submit" value="Send" className="btn btn-primary" onClick={ this.handleFormSubmit }/>
                    </div>
                  </div>
                </form>
    )}
}

const mapStateToProps = state => ({
  messages: state.messages,
})

const mapDispatchToProps = dispatch => bindActionCreators({
//  messageAdded: createMessage,
  createMessage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar)


