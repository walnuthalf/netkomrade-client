import React from "react"

export default class NetList extends React.Component {
  constructor(){
    super()
    this.newNet = {}
  }
  makeCurrent(network){
    return function(e) {
      this.props.setActNetwork(network)
      this.props.setNetMode("display")
    }   
  }

  changeMode(){
    return function(e) {
      this.props.setNetMode("new")
    }   
  }
  checkFields(obj, keys){

  }
  addNet(e){
    this.props.addNet(this.newNet)
  }
  changeInput(name){
    return function(e) {
      this.newNet[name] = e.target.value
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
    const netInfo = <div> {address} {port} {nick}</div>
    const nwInputs = <div> 
      <input onChange={this.changeInput("name").bind(this)} 
        placeholder="name"/>  
      <input onChange={this.changeInput("address").bind(this)} 
        placeholder="address"/>  
      <input onChange={this.changeInput("port").bind(this)} 
        placeholder="ssl port"/>  
      <input onChange={this.changeInput("nick").bind(this)} 
        placeholder="nick"/>  
      <input onChange={this.changeInput("password").bind(this)} 
        type="password" 
        placeholder="password"/>  
      <button onClick={this.addNet.bind(this)}> 
        add
      </button>
    </div>

    const mode = this.props.netMode
    return <div>
       <div> 
        <button onClick={this.changeMode().bind(this)}> 
          add network 
        </button>
        {buttons} 
       </div>
       {mode == "new" ? nwInputs : netInfo}
      </div>
  }
}
