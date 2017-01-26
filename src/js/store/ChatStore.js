import { computed, observable } from "mobx"

import {commandConf, utilConf} from "../commands/commandConf"
import {TabConf} from "./TabConf"

export class ChatStore {
  @observable netMap = {}
  @observable actTab = {}
  @observable actNetwork = ""
  @observable netMode = "display"
  @observable newNet = {}
  @observable note = "use /load_session pass to connect"

  @observable tabs = []
  @observable ws = false
  @observable msgs = []

  @computed get  actNetSt(){
    const network = this.actNetwork;
    if(network in this.netMap) {
      return this.netMap[network].st
    }
    else{
      return false
    }
  }

  @computed get filteredMsgs() {
    var network = this.actTab.network;
    var receiver = this.actTab.receiver;
    if (network in this.netMap){
      var nick = this.netMap[network].nick
    }
    else {
      return []
    }
    
    var filterFunc = function(msg){
      var match = false
      if (receiver.startsWith("#")){
        match = (msg.to == receiver) 
      }
      else {
        match = (msg.to == nick && msg.from == receiver) || (
          msg.from == nick && msg.to == receiver
        ) 
          
      }
      return msg.network == network && match 
    }
    return this.msgs.filter(filterFunc);
  }
  
  constructor() {
    this.commandConf = commandConf  
  }
  addNet(net){
    const cond = net.name 
      && net.address 
      && net.nick && parseInt(net.port)
    if(cond){
      utilConf["add_network"](net, this)
    }
  }
  setActTab(tab){
    let msgObj = {
      type: "set_acttab",
      network: tab.network,
      receiver: tab.receiver
    }
    this.ws.send(JSON.stringify(msgObj))
  }

  setActNetwork(name){
    this.actNetwork = name
    let msgObj = {
      type: "set_netst",
      name: name
    }
    this.ws.send(JSON.stringify(msgObj))
  }

  setNetMode(mode){
    this.netMode = mode
  }
  compareTabs(tab1, tab2){
    return tab1.network == tab2.network && tab1.receiver == tab2.receiver
  }

  parseCommand(cmdStr){
    let re = /^\/(\w+)\s*(.*?$)/
    let matches = re.exec(cmdStr)
    let cmd = "", paramStr = ""

    let cmdObj = {} 

    if (matches) {
      cmd = matches[1]
      paramStr = matches[2] 
      if (cmd in commandConf) {
        try{
          commandConf[cmd](paramStr, this) 
        }
        catch(e){
          this.note = "/" + cmd + " failed"
        }
      }
      else{
          this.note = "invalid command: " + cmd
      }
    }
    else{
      try{
        commandConf["send"](cmdStr, this)  
      }
      catch(e){
        this.note = "send failed"
      }
    }
  }
}

export default new ChatStore
