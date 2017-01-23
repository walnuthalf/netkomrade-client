import React from "react"

export default class MessageList extends React.Component {
  componentDidMount(){
    var objDiv = document.getElementById("bottomMsg");
    objDiv.scrollIntoView()
  }
  componentDidUpdate(){
    var objDiv = document.getElementById("bottomMsg");
    objDiv.scrollIntoView()
  }
  render() {
    const limsgs = this.props.msgs.map(msg => (
      <li>{msg.from}: {msg.text}</li>
    ))
    return <ul>{limsgs}</ul>
  }
}
