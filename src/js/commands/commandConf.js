import {newTab, query, loadSession, send, join} from "./funcs/general.js"

let commandConf = {
  new_tab: newTab, 
  query: query,
  join: join,
  load_session: loadSession,
  send: send
}

export {commandConf}
