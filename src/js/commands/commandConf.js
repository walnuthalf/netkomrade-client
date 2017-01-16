import {newTab, query, loadSession, send, join, close, removeNetwork, setNetwork} from "./funcs/general.js"

let commandConf = {
  new_tab: newTab, 
  query: query,
  join: join,
  close: close,
  set_network: setNetwork,
  remove_network: removeNetwork,
  load_session: loadSession,
  send: send
}

export {commandConf}
