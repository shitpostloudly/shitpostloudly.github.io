import React, { Component } from 'react';
import { ShitpostCentral } from './ShitpostJS'
import { Link } from 'react-router-dom'
import { rand255 } from "./utils/rand255";
import { restrictBetween } from './utils/restrictBetween'
import { GColor } from './utils/colors'
import { ShitpostSpeech } from './ShitpostJS'

import './App.css';
import './RoundedSubmitButton.css'

const textAreaStyle = {
  resize: 'vertical',
  boxSizing: 'border-box',
  width: '100%',
  padding: 10,
  height: 200,
  minHeight: 200,
  fontSize: 16,
  borderRadius: 20
}

const RoundedSubmitButton = ({ color='black', invertedColor='white', onClick=()=>{} }) => {
  return (
    <button
    className="RoundedSubmitButton"
    style={{ marginTop: 5, color: invertedColor, backgroundColor: color, borderColor: color }}
    onClick={onClick}>Submit</button>
  )
}

export default class MemeMaker extends Component {
  constructor() {
    super()
    const color = new GColor(0, 0, 0)
    this.state = {
      text: '',
      url: '',
      backgroundColor: color,
      disableTextArea: false
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
    if (!this.state.text || !this.state.text.trim()) return
    ShitpostCentral.submitToGlotIo(this.state.text).then(x => {
      if (!x) return
      this.setState({ url: '/' + x, disableTextArea: true })
    })
  }

  render() {
    const bgColor = this.state.backgroundColor
    const cssBgColor = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
    const restrict = restrictBetween(0, 125)
    document.body.style.backgroundColor = cssBgColor
    const color = `rgb(${restrict(bgColor.r*0.5)}, ${restrict(bgColor.g*0.5)}, ${restrict(bgColor.g*0.5)})`
    const invertedColor = (bgColor.r > 155 || bgColor.g > 155 || (bgColor.b > 180 && bgColor.g > 90) || (bgColor.b > 180 && bgColor.r > 90)) ? color : 'white'
    return (
      <div className="ShitpostContainer">
        <div className="ShitpostCentre" style={{ textAlign: 'center' }}>
          <div style={{ borderRadius: 15, padding: '25px 40px', backgroundColor: '#eee' }}>
            <div style={{ textAlign: 'left' }}><Link style={{ fontSize: '1em' }} to="/">&lt; Back to Shitposts</Link></div>
            <h1 style={{ color: color }}>Generate some fucking shitposts</h1>
            <textarea disabled={this.state.disableTextArea} style={textAreaStyle} placeholder="YOUR TEXT HERE" onChange={(e) => this.textChange(e.target.value)} value={this.state.text} />
            <RoundedSubmitButton color={cssBgColor} invertedColor={invertedColor} onClick={this.submit} />
            {(this.state.url) ? <div style={{ padding: 10 }}><Link style={{ width: '100%', fontSize: '1.4em'}} to={this.state.url}>Here's your link!</Link></div> : <div></div>}
          </div>
        </div>
        <ShitpostSpeech />
      </div>
    )
  }
}