function addNetwork(inp, store){
  const {name, address, port, nick, password} = inp
  let msgObj = {
    type: "set_network", 
    nwObj: {
      name: name,
      address: address,
      port: parseInt(port),
      password: password,
      nick: nick
    }
  }
  store.ws.send(JSON.stringify(msgObj))  
}

let utilConf = {
  add_network: addNetwork
}
export {utilConf}
