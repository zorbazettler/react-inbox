import React from 'react'

//const Message = (props) => {
class Message extends React.Component {
    constructor(props) {
        //  Must call super(props)
        super(props);
        var theClassName
        var isChecked

        // bind the event handlers to the appropriate context
        this.handleDivClick  = this.handleDivClick.bind(this)
        this.handleStarClick = this.handleStarClick.bind(this)


        //  If the Select All button is clicked or the checkbox is checked
        //  the message is selected
        if(this.props.selectAll || this.props.message.checked) {
            theClassName = "row message read selected"
            isChecked    = true
        } else {
            //  check the message property to determine if read or not and checked property for state
            theClassName = this.props.message.read ? "row message read" : "row message unread"
            isChecked = this.props.message.checked
        }

        //  Initialize state with whether the message has been read, starred or checked
        this.state = {
            "readClassName"    : theClassName,
            "starredClassName" : this.props.message.starred ? "star fa fa-star"  : "star fa fa-star-o",
            "checked"          : isChecked
        }
    }

    //  Toggle style (selected) when the div is clicked
    //  and check the checkbox when selected, uncheck when not de selected
    handleDivClick = () => {
        var read = this.state.readClassName
        var theState = (read.includes("selected") ? read.slice(0, -9) : read + " selected")
        var checkedState = this.state.checked ? false : true

        //  Set the state of the existing div class name and checkbox status
        this.setState({
            'readClassName': theState,
            'checked'      : checkedState
        })
    }

    //  Toggle the className when the star is clicked
    handleStarClick = () => {
        var starClassName = (this.state.starredClassName === "star fa fa-star" ? "star fa fa-star-o" : "star fa fa-star")

        this.setState({
            'starredClassName': starClassName
        })
    }


    render () {
      return (
        <div className={this.state.readClassName }>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={ this.state.checked } onClick={ this.handleDivClick } />
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

/*
const messages = [
  { id: 1, unread: true,  checked: false, starred: false, read: false, subject: string1 },
  { id: 2, unread: true,  checked: true,  starred: false, read: false, subject: string2 },
  { id: 3, unread: true,  checked: false, starred: false, read: false, subject: string3 },
  { id: 4, unread: false, checked: true,  starred: true,  read: true,  subject: string4 },
  { id: 5, unread: true,  checked: false, starred: false, read: false, subject: string5 },
  { id: 6, unread: false, checked: false, starred: false, read: true,  subject: string6 },
  { id: 7, unread: false, checked: false, starred: true,  read: true,  subject: string7 },
  { id: 8, unread: false, checked: false, starred: false, read: true,  subject: string8 }
]
*/
