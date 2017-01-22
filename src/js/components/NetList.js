import React from "react"

export default class NetList extends React.Component {
  makeCurrent(network){
    return function(e) {
      this.props.setActNetwork(network)
    }   
  }

  render() {
    const netMap = this.props.netMap
    const buttons = Object.keys(netMap).map(
      network => (
        <button style={network == this.props.actNetwork  ? 
        {color: "red"} : {color: "black"}} 

          onClick={this.makeCurrent(network).bind(this)}> 
          {network} 
        </button>
    ))
    const netConf = netMap[this.props.actNetwork]
    let address = "", port = "", nick = ""
    if (netConf){
      address = netConf.address 
      port = netConf.port 
      nick = netConf.nick 
    }
    return <div>
       <div> {buttons} </div>
       <div> {address} {port} {nick}</div>
      </div>
  }
}
