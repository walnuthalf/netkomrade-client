import { serverAddress } from "../../config/settings.js"
import { processMsg } from "../server/msg.js"

let parseAsJSON = function(str) {
  try {
    return JSON.parse(str) 
  }
  catch(e){
     return false 
  }
}

let parseAsWords = function(str) {
   return str.split(/\s/)  
}

let newTab = function(paramStr, store){
    const inputObj = parseAsJSON(paramStr)
    if (inputObj) {
      const {name, conf, filter} = inputObj
      let newTabConf = Object.assign({}, store.tabConf) 
      newTabConf[name] = {conf: conf, filter: filter}
      store.tabConf = newTabConf
    }
}

let query = function(paramStr, store){
  const words = parseAsWords(paramStr)
  const [receiver, network] = words
  if (receiver && network) {
    let msgObj = {type: "query", network: network, receiver: receiver}
     store.ws.send(JSON.stringify(msgObj))  
  }
}

let join = function(paramStr, store){
  const words = parseAsWords(paramStr)
  const [channel, network] = words
  if (receiver && network) {
    let msgObj = {type: "join", network: network, receiver: receiver}
     store.ws.send(JSON.stringify(msgObj))  
  }
}


let close = function(paramStr, store){
  const {network, receiver} = store.actTab
  let msgObj = {
    type: "close", 
    network: network,
    receiver: receiver
  }
  store.ws.send(JSON.stringify(msgObj))  
}

let loadSession = function(paramStr, store) {
   store.ws = new WebSocket(serverAddress)  
   store.ws.onopen = function(e){
     let msgObj = {type: "load_session", pass: paramStr}
     store.ws.send(JSON.stringify(msgObj))  
     store.ws.onmessage = function(e){
       processMsg(e.data, store);
     }
   }
}

let setNetwork = function(paramStr, store){
  const [name, address, port, nick] = parseAsWords(paramStr)
  let msgObj = {
    type: "set_network", 
    nwObj: {
      name: name,
      address: address,
      port: parseInt(port),
      nick: nick
    }
  }
  store.ws.send(JSON.stringify(msgObj))  
}

let removeNetwork = function(paramStr, store){
  let msgObj = {
    type: "remove_network", 
    name: paramStr
  }
  store.ws.send(JSON.stringify(msgObj))  
}

let send = function(paramStr, store) {
  let network = store.actTab.network
  let receiver = store.actTab.receiver
  let nick = store.netMap[network].nick
  let msg =  {
      network: network, 
      to: receiver, 
      from: nick,
      text: paramStr}
  let msgObj = {
    type: "msg", 
    msg: msg
    }
  store.msgs = store.msgs.concat(msg);
  try{
    store.ws.send(JSON.stringify(msgObj))  
  }
  catch(e) {}
}

export {newTab, query, loadSession, send, join, close, setNetwork, removeNetwork}
