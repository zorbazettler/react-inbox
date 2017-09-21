import React from 'react'

//const ToolBar = (props) => {
//const MessageList = ({messages}) => {
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
            "messages"                 : this.props.messages,
            "selectAllButtonClassName" : this.props.buttonClassName,
            "formDisplay"              : false
        }
    }

    // Props changed, so prepare to render the message
    componentWillReceiveProps(nextProps) {
        this.setState({"selectAllButtonClassName": this.props.buttonClassName})
    }

    handleComposeClick = () => {
        this.setState({"formDisplay": this.state.formDisplay ? false : true})
    }

    handleFormSubmit = (subject, body) => {
        this.props.callbackFromToolBarAddMessage(subject, body)

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
        return (
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
                  <i className={ this.props.buttonClassName }></i>
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
    handleFormSubmit = (subject, body) => {
        var subject = document.getElementById("subject").value
        var body    = document.getElementById("body").value

        this.props.callbackFromToolBarAddMessage(subject, body)
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

export default ToolBar

/*
                <button className="btn btn-default" disabled="disabled">

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