import React, { Component } from 'react';
import { ShitpostCentral } from './ShitpostJS'
import { Link } from 'react-router-dom'

import './App.css';

export default class MemeMaker extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      url: ''
    }
  }

  textChange = (text) => {
    this.setState({ text: text })
  }
  
  submit = () => {
    ShitpostCentral.submitToGlotIo(this.state.text).then(x => this.setState({ url: '/' + x }))
  }

  render() {
    return (
      <div className="ShitpostContainer">
        <div className="ShitpostCentre" style={{ textAlign: 'center' }}>
          <h1>Generate some fucking shitposts</h1>
          <textarea style={{ boxSizing: 'border-box', width: '100%', height: 200, fontSize: 16 }} placeholder="YOUR TEXT HERE" type="text" onChange={(e) => this.textChange(e.target.value)} value={this.state.text} />
          <button style={{ height: 40, width: '100%', fontSize: '1.4em' }} onClick={this.submit}>Submit</button>
          {(this.state.url) ? <div style={{ padding: 10 }}><Link style={{ width: '100%', fontSize: '1.4em'}} to={this.state.url}>Here's your link!</Link></div> : <div></div>}
        </div>
      </div>
    )
  }
}