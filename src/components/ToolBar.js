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

    handleMarkAsReadClick = () => {
        this.props.callbackFromToolBarToggleRead(true)
    }

    handleMarkAsUnreadClick = () => {
        this.props.callbackFromToolBarToggleRead(false)
    }


    render() {
        return (
            <div className="row toolbar">
              <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">2</span>
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

                <select className="form-control label-select" disabled="disabled">
                  <option>Apply label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" disabled="disabled">
                  <option>Remove label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled="disabled">
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