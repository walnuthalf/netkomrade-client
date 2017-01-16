let parseAsJSON = function(str) {
  try {
    return JSON.parse(str) 
  }
  catch(e){
     return false 
  }
}

let setTabConf = function(msgObj, store) {
  const tabs = msgObj.tabs
  store.tabs = tabs 
  if(tabs.length > 0){
    store.actNetwork = tabs[0].network;  
    store.actReceiver = tabs[0].receiver;  
    store.actNick = tabs[0].nick;  
    store.actTabType = tabs[0].type;  
  }
} 

let saveMsg = function(msgObj, store) {
  store.msgs = store.msgs.concat([msgObj.msg]);
} 

let typeToFunc = {load_session: setTabConf, irc_msg: saveMsg}

let processMsg = function(msgStr, store) {
  var msgObj = parseAsJSON(msgStr);
  if (msgObj) { 
    if(msgObj.type in typeToFunc) {
      typeToFunc[msgObj.type](msgObj, store)  
    }
  }
} 

export {processMsg}
