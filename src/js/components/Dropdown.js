import React from "react"

export default class Dropdown extends React.Component {
  render(){ 
    const options = this.props.options.map(opt => (
        <option value={opt}>{opt}</option>
    ))
    return <label>{this.props.label}:
        <select name={this.props.name}>
          {options}
        </select>
      </label>
  }
}
