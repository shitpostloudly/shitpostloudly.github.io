import React, { Component } from 'react';
import { ShitpostCentral } from './ShitpostJS'
import { Link } from 'react-router-dom'

import './App.css';

export default class MemeMaker extends Component {
  constructor() {
    super()
    let keyText = '';
    if (window.localStorage && window.localStorage.getItem("key")) keyText = window.localStorage.getItem("key")
    this.state = {
      text: '',
      key: keyText,
      url: ''
    }
  }

  textChange = (text) => {
    this.setState({ text: text })
  }

  apiKeyChange = (keyText) => {
    window.localStorage.setItem("key", keyText)
    this.setState({ key: keyText })
  }
  
  submit = () => {
    ShitpostCentral.submitToPastebin(this.state.key, this.state.text).then(x => {
      let parsedUrl = x.split("/").slice(-1)[0]
      this.setState({url: '/' + parsedUrl })
    })
  }

  render() {
    return (
      <div className="ShitpostContainer">
        <div className="ShitpostCentre">
          <h1>Generate some fucking shitposts</h1>
          <div>
            <label>Your fucking Pastebin Developer Key here: <input placeholder="PASTEBIN DEV API KEY HERE" type="text" value={this.state.key} onChange={e => this.apiKeyChange(e.target.value)} /></label>
          </div>
          <div>
            <textarea style={{ width: 500, height: 200, fontSize: 16 }} placeholder="YOUR TEXT HERE" type="text" onChange={(e) => this.textChange(e.target.value)} value={this.state.text} />
          </div>
          <button onClick={this.submit}>Submit</button>
          {(this.state.url) ? <Link to={this.state.url}>Here's your link!</Link> : <div></div>}
        </div>
      </div>
    )
  }
}