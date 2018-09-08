import React, { Component } from 'react';
import { ShitpostCentral } from './ShitpostJS'
import { Link } from 'react-router-dom'
import { rand255 } from "./rand255";
import { restrictBetween } from './restrictBetween'
import { GColor } from './colors'
import { ShitpostSpeech } from './ShitpostJS'

import './App.css';

export default class MemeMaker extends Component {
  constructor() {
    super()
    const color = new GColor(0, 0, 0)
    this.state = {
      text: '',
      url: '',
      backgroundColor: color
    }
  }

  componentDidMount() {
    window.speechSynthesis && window.speechSynthesis.cancel()
    let color = new GColor(rand255(), rand255(), rand255())
    this.setState({ backgroundColor: color })
  }

  textChange = (text) => {
    this.setState({ text: text })
  }
  
  submit = () => {
    ShitpostCentral.submitToGlotIo(this.state.text).then(x => this.setState({ url: '/' + x }))
  }

  render() {
    const bgColor = this.state.backgroundColor;
    const restrict = restrictBetween(0, 160)
    document.body.style.backgroundColor = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
    const color = `rgb(${restrict(bgColor.r*0.5)}, ${restrict(bgColor.g*0.5)}, ${restrict(bgColor.g*0.5)})`
    return (
      <div className="ShitpostContainer">
        <div className="ShitpostCentre" style={{ textAlign: 'center' }}>
          <div style={{ borderRadius: 15, padding: '25px 40px', backgroundColor: '#eee' }}>
            <div style={{ textAlign: 'left' }}><Link style={{ fontSize: '1em' }} to="/">&lt; Back to Shitposts</Link></div>
            <h1 style={{ color: color }}>Generate some fucking shitposts</h1>
            <textarea style={{ resize: 'vertical', boxSizing: 'border-box', width: '100%', padding: 10, height: 200, minHeight: 200, fontSize: 16 }} placeholder="YOUR TEXT HERE" type="text" onChange={(e) => this.textChange(e.target.value)} value={this.state.text} />
            <button style={{ height: 40, width: '100%', fontSize: '1.4em', backgroundColor: 'transparent' }} onClick={this.submit}>Submit</button>
            {(this.state.url) ? <div style={{ padding: 10 }}><Link style={{ width: '100%', fontSize: '1.4em'}} to={this.state.url}>Here's your link!</Link></div> : <div></div>}
          </div>
        </div>
        <ShitpostSpeech />
      </div>
    )
  }
}