let parseAsJSON = function(str) {
  try {
    return JSON.parse(str) 
  }
  catch(e){
     return false 
  }
}

let saveMsg = function(msgObj, store) {
  store.msgs = store.msgs.concat([msgObj.msg]);
} 


function loadSession(msgObj, store){
  store.tabs = msgObj.tabs  
  store.actTab = msgObj.actTab
  store.msgs = msgObj.msgs
  let netMap = {}
  msgObj.netconfs.forEach(
    nc => netMap[nc.name] = {
      nick: nc.nick,
      address: nc.address,
      port: nc.port,
      password: nc.password  
    })
  store.netMap = netMap
  let networks = Object.keys(netMap) 
  if (networks.length > 0) {
    store.actNetwork = networks[0]
  }
}

function processActTab(msgObj, store){
  store.actTab = {
    network: msgObj.network,
    receiver: msgObj.receiver
  }
}

function processTabs(msgObj, store){
  store.tabs = msgObj.tabs  
  store.actTab = msgObj.actTab
}
function processNets(msgObj, store){
  let netMap = {}
  msgObj.netconfs.forEach(
    nc => netMap[nc.name] = {
      nick: nc.nick,
      address: nc.address,
      port: nc.port,
      password: nc.password  
    })
  store.netMap = netMap
  let networks = Object.keys(netMap) 
  if (networks.length > 0) {
    store.actNetwork = networks[0]
    store.netMode = "display"
  }
}

let typeToFunc = {
  load_session: loadSession, 
  send_tabs: processTabs, 
  set_networks: processNets, 
  set_acttab: processActTab, 
  irc_msg: saveMsg}

let processMsg = function(msgStr, store) {
  var msgObj = parseAsJSON(msgStr);
  if (msgObj) { 
    if(msgObj.type in typeToFunc) {
      typeToFunc[msgObj.type](msgObj, store)  
    }
  }
} 

export {processMsg}
