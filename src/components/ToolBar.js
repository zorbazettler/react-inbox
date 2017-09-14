import React from 'react'

//const ToolBar = (props) => {
//const MessageList = ({messages}) => {
class ToolBar extends React.Component {
    constructor (props) {
        super(props);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this)

        this.state = {
            "selectAll" : this.props.selectAll,
            "messages"  : this.props.messages
        }
    }

    handleSelectAllClick = () => {
        this.props.callbackFromParent()
    }

    render() {
    return (
        <div className="row toolbar">
          <div className="col-md-12">
            <p className="pull-right">
              <span className="badge badge">2</span>
              unread messages
            </p>

            <button className="btn btn-default">
              <i className="fa fa-square-o" onClick={ this.handleSelectAllClick }></i>
            </button>

            <button className="btn btn-default" disabled="disabled">
              Mark As Read
            </button>

            <button className="btn btn-default" disabled="disabled">
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