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
  const [nick, network] = words
  if (nick && network) {
    let msgObj = {type: "query", network: network, nick: nick}
     store.ws.send(JSON.stringify(msgObj))  
  }
}

let join = function(paramStr, store){
  const words = parseAsWords(paramStr)
  const [channel, network] = words
  if (channel && network) {
    let msgObj = {type: "join", network: network, channel: channel}
     store.ws.send(JSON.stringify(msgObj))  
  }
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

let send = function(paramStr, store) {
  let msg =  {
      network: store.actNetwork,
      to: store.actReceiver,
      from: store.actNick,
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

export {newTab, query, loadSession, send, join}
