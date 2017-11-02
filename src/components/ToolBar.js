import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { createMessage,
         messagesSelectAllToggled,
         messagesMarkAsReadToggled,
         messagesApplyLabel,
         messagesDelete } from '../actions'

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
            "formDisplay" : false,
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
        var apiMessage = {
            "subject" : subject,
            "body"    : body,
        }

        //store.dispatch(createMessage(apiMessage))
        this.props.createMessage(apiMessage)

        this.setState({"formDisplay": false})
    }

    //  The ToolBar's select/deselect all button was clicked
    handleSelectAllClick = () => {
        var checkedMessages   = this.props.messages.filter(message => message.checked === true)
        var selectedMessages  = []
        var checkStatus
        var theButtonClassName

       //  If all of the messages are selected, unselect all
        //if (this.props.messages.length === 0) {
        if (checkedMessages.length === this.props.messages.length) {
            checkStatus = false
            theButtonClassName = "fa fa-square-o"
        } else {
            //  select all
            checkStatus = true
            theButtonClassName = "fa fa-check-square-o"
        }

        //  set the checked property for all messages
        this.props.messages.forEach(message => {
          message.checked = checkStatus

          selectedMessages.push(message)
        })

        this.props.toggleSelectAll(selectedMessages)
    }

    //  the Mark As Read button is clicked
    handleMarkAsReadClick = () => {
        //this.props.callbackFromToolBarToggleRead(true)
        this.handleToggleMarkReadUnread(true)
    }

    //  the Mark As Unread button is clicked
    handleMarkAsUnreadClick = () => {
        //this.props.callbackFromToolBarToggleRead(false)
        this.handleToggleMarkReadUnread(false)
    }

    handleToggleMarkReadUnread = (isRead) => {
        var readMessages = []
        var messageIds   = []

        //  set the checked property for all selected messages
        this.props.messages.forEach(message  => {
            //  If message is checked, set the read boolean and
            //  add to the array of checked messages
            if (message.checked) {
                message.read = isRead
                messageIds.push(message.id)
              }
              readMessages.push(message)
        })

        this.props.callbackFromToolBarToggleRead(messageIds, isRead, readMessages)
    }


    //  When the Add Label button is clicked
    //  call back to App to administer, change state and re-render
    handleApplyLabelClick = () => {
        var sel = document.getElementById("applyLabelSelect")

//        this.props.callbackFromTooBarApplyLabel(sel.options[sel.selectedIndex].value)
        this.administerLabel(sel.options[sel.selectedIndex].value, true)

    }

    //  When the Remove Label button is clicked
    //  call back to App to administer, change state and re-render
    handleRemoveLabelClick = () => {
        var sel = document.getElementById("removeLabelSelect")

        //this.props.callbackFromToolBarRemoveLabel(sel.options[sel.selectedIndex].value)
        this.administerLabel(sel.options[sel.selectedIndex].value, false)
    }

    administerLabel = (theLabel, addLabel) => {
        var selectedMessages = []
        var messageIds       = []

        //  Loop through the messages.  If checked then administer
        //
        //  if addLabel === true  then add if it doesn't already exist
        //  if addLabel === false then remove if it does exist already
        this.props.messages.forEach(message => {

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

        this.props.callbackFromTooBarApplyLabel(messageIds, theLabel, addLabel, selectedMessages)
    }

    handleDeleteClick = () => {
        var selectedMessages = []
        var messageIds       = []

        //  set the checked property for all selected messages
        this.props.messages.forEach(message  => {

        if (message.checked) {
            //  remove it
            messageIds.push(message.id)

          } else {
            selectedMessages.push(message)
          }
        })

        this.props.callbackFromToolBarDeleteMessages(messageIds, selectedMessages)
    }

    render() {
        var theButtonClassName = "fa fa-minus-square-o"
        var selectedMessages = this.props.messages

        if (selectedMessages.length !== undefined) {
            //  determine checked button className
            //  create an array of all messages that are checked and unchecked
            var numCheckedMessages   = selectedMessages.filter(message => message.checked === true).length
            var numUncheckedMessages = (selectedMessages.length - numCheckedMessages)
            //var unCheckedMessages = selectedMessages.filter(message => message.checked === false)

            //  Set the button class name if all or no messages checked
            if (numCheckedMessages === 0) {
                //  No messages checked
                theButtonClassName = "fa fa-square-o"
            } else if (numUncheckedMessages === 0) {
                //  All messages checked
                theButtonClassName = "fa fa-check-square-o"
            }
        }

        return (
        (selectedMessages.length !== undefined && this.props.messages.length !== undefined) ? (
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
  messages: state.messages.all,
  unreadMessageCount: state.messages.unreadMessageCount,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSelectAll:                   messagesSelectAllToggled,
    callbackFromToolBarToggleRead:     messagesMarkAsReadToggled,
    callbackFromTooBarApplyLabel:      messagesApplyLabel,
    callbackFromToolBarDeleteMessages: messagesDelete,
    createMessage,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar)


