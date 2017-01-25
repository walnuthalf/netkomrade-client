import React from "react"
import { observer } from "mobx-react"

import Dropdown from "./Dropdown"
import MessageList from "./MessageList"
import TabList from "./TabList"
import NetList from "./NetList"

@observer
export default class Layout extends React.Component {
  processCommand(e) {
    if (e.which === 13) {
      this.props.store.parseCommand(e.target.value);
      e.target.value = ""
    }
  }

  render() {
    let chatStyle = {
        height: "80vh",
        overflow: "auto"
    }
    let store = this.props.store
    return <div>
      <div style={chatStyle}>
        <MessageList msgs={this.props.store.filteredMsgs} />
        <div id="bottomMsg"> </div>
      </div>
      <div>
        {store.note}
      </div>
      <NetList netMap={store.netMap} 
        setNetMode={store.setNetMode.bind(store)}
        addNet={store.addNet.bind(store)}
        netMode={store.netMode}
        actNetwork={store.actNetwork}
        setActNetwork={store.setActNetwork.bind(store)}
      />
      <TabList tabs={this.props.store.tabs} 
        actTab={this.props.store.actTab}
        setActTab={this.props.store.setActTab.bind(this.props.store)}/>
       <input size="70" 
       onKeyPress={this.processCommand.bind(this)} />
    </div>
  }
}
