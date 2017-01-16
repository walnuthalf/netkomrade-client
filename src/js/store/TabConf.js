import { computed, observable } from "mobx"

export class TabConf {
  @observable filter=""
  @observable conf={}

  constructor(conf, filter){
    this.filter = filter 
    this.conf = conf 
  }
  testText(text) {
    var matchesFilter = new RegExp(this.filter, "i")
    return !this.filter || matchesFilter.test(text)
  }

  testInArray(el, array) {
   return array.indexOf(el) > -1;
  }

  testMessage(msg) {
    const { network, to, from, type, text } = msg
    if (network in conf && this.testText(text)) {
      const {nicks, channels} = conf[network]
        switch(type){
          case "pm": 
            return this.testInArray(from, nicks)
          case "channel":
             return this.testInArray(from, channels)
          default: 
            return false 
        } 
    }
  }  
}
