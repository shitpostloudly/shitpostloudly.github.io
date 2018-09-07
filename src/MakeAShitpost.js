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
        <div className="ShitpostCentre">
          <h1>Generate some fucking shitposts</h1>
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