import React from 'react'

//const Message = (props) => {
class Message extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props)

        // bind the event handlers to the appropriate context
        this.handleMessageCheckboxClick  = this.handleMessageCheckboxClick.bind(this)
        this.handleStarClick = this.handleStarClick.bind(this)

        //  Set css classNames based on message characteristics
        this.prepareToRender()
    }

      prepareToRender = () => {
        //  build the message (<tr>) className based on characteristics of the message
        var theClassName = "row message"
        theClassName += (this.props.message.read    ? " read"     : " unread")
        theClassName += (this.props.message.checked ? " selected" : "")

        //  Set or initialize state with whether the message has been read, starred or checked
        if (this.state == null) {
            this.state = {
                "readClassName"    : theClassName,
                "starredClassName" : this.props.message.starred ? "star fa fa-star"  : "star fa fa-star-o",
                "messageChecked"   : this.props.message.checked,
            }
        } else {
            //  Set the state
            this.setState({
                "readClassName"    : theClassName,
                "starredClassName" : this.props.message.starred ? "star fa fa-star"  : "star fa fa-star-o",
                "messageChecked"   : this.props.message.checked,
            })
        }
      }

      // Props changed, so prepare to render the message
      componentWillReceiveProps(nextProps) {
        this.prepareToRender()
      }

    //  Toggle style (selected) when the div is clicked
    //  and check the checkbox when selected, uncheck when not de selected
    handleMessageCheckboxClick = () => {
        var read         = this.state.readClassName
        var theState     = (read.includes("selected") ? read.slice(0, -9) : read + " selected")
        //var checkedState = this.state.checked ? false : true

        //  Set the state of the existing div class name and checkbox status
        this.setState({
            'readClassName': theState,
            //'checked'      : checkedState
        })

        //callback, pass message
        this.props.callbackFromParent(this.props.message.id)

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
      return (
        <div className={this.state.readClassName }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={ this.state.messageChecked } onClick={ this.handleMessageCheckboxClick } />
              </div>
              <div className="col-xs-2">
                <i className={ this.state.starredClassName } onClick={ this.handleStarClick }></i>
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

export default Message


//console.log(JSON.stringify(messages))

