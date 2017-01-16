import React from "react"
import { observer } from "mobx-react"

import Dropdown from "./Dropdown"
import MessageList from "./MessageList"
import TabList from "./TabList"

@observer
export default class Layout extends React.Component {
  processCommand(e) {
    if (e.which === 13) {
      this.props.store.parseCommand(e.target.value);
      e.target.value = ""
    }
  }

  render() {
    return <div>
      <MessageList msgs={this.props.store.filteredMsgs} />
      <TabList tabs={this.props.store.tabs} 
        actTab={this.props.store.actTab}
        setActTab={this.props.store.setActTab.bind(this.props.store)}/>
      <input size="70"
      onKeyPress={this.processCommand.bind(this)} />
    </div>
  }
}
