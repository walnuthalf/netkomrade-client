import "../css/main.css"

import React from "react"
import ReactDOM from "react-dom"

import ChatStore from "./store/ChatStore"
import Layout from "./components/Layout"

const app = document.getElementById("app")

ReactDOM.render(<Layout store={ChatStore} />, app)

