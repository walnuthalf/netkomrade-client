import React from "react"

export default class MessageList extends React.Component {
  render() {
    const limsgs = this.props.msgs.map(msg => (
      <li>{msg.from}: {msg.text}</li>
    ))
    return <ul>{limsgs}</ul>
  }
}
