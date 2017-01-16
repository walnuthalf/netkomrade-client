import React from "react"

export default class TabList extends React.Component {
  makeCurrent(tab){
    return function(e) {
      this.props.setActTab(tab)
    }   
  }

  compareTabs(tab1, tab2){
    return tab1.network == tab2.network && tab1.receiver == tab2.receiver
  }

  render() {
    const buttons = this.props.tabs.map(
      tab => (
        <button style={this.compareTabs(tab, this.props.actTab) ? 
        {color: "red"} : {color: "black"}} 
          onClick={this.makeCurrent(tab).bind(this)}>
          {tab.receiver} on {tab.network}
        </button>
    ))
    return <div>{buttons}</div>
  }
}
