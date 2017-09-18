import React from 'react'

//const ToolBar = (props) => {
//const MessageList = ({messages}) => {
class ToolBar extends React.Component {
    constructor (props) {
        super(props);

        //  Bind the button click to the appropriate context
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
        this.handleMarkAsReadClick = this.handleMarkAsReadClick.bind(this)
        this.handleMarkAsUnreadClick = this.handleMarkAsUnreadClick.bind(this)

        this.state = {
            "messages"  : this.props.messages,
            "selectAllButtonClassName" : this.props.buttonClassName
        }
    }

    // Props changed, so prepare to render the message
    componentWillReceiveProps(nextProps) {
        this.setState({"selectAllButtonClassName": this.props.buttonClassName})
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
            </div>
        )
    }
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