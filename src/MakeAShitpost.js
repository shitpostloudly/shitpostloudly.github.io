import React, { Component } from 'react';
import { ShitpostCentral } from './ShitpostJS'
import { Link } from 'react-router-dom'
import { rand255 } from "./utils/rand255";
import { GColor, idealColorFunction, changeLuminosity } from './utils/colors'
import { ShitpostSpeech } from './ShitpostJS'
import ReCAPTCHA from 'react-google-recaptcha'

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
  borderColor: '#aaa',
  borderRadius: 20,
  borderTopLeftRadius: 0,
  borderBottomRightRadius: 0,
  margin: 0,
  outline: 0
}

const RoundedSubmitButton = ({ disabled, color='black', invertedColor='white', onClick=()=>{} }) => {
  return (
    <button
    disabled={disabled}
    className="RoundedSubmitButton"
    style={{ marginTop: 5, color: invertedColor, backgroundColor: color, borderColor: color }}
    onClick={onClick}>Submit</button>
  )
}

const reCAPTCHAKey = '6LeFDHEUAAAAAAlVeMaEwP1epvbYaqx5aSk6EWUv'

const recaptchaRef = React.createRef();

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
    ShitpostCentral.submitToGlotIo(this.state.text).then(x => {
      if (!x) return
      this.setState({ url: '/' + x, disableTextArea: true })
    })
  }

  validateAndSubmit = () => {
    if (!this.state.text || !this.state.text.trim()) return
    recaptchaRef.current.execute()
  }

  render() {
    const bgColor = this.state.backgroundColor
    const color = changeLuminosity(bgColor, -0.4)
    document.body.style.backgroundColor = bgColor.toCSSColor()
    const invertedColor = idealColorFunction(new GColor(255, 255, 255), color)(bgColor)
    const linkStyle = {
      fontSize: '1.4em',
      color: color.toCSSColor(),
      width: '100%'
    }    
    return (
      <div className="ShitpostContainer">
        <div className="ShitpostCentre" style={{ textAlign: 'center' }}>
          <div style={{ borderRadius: 15, padding: '25px 40px', backgroundColor: '#eee' }}>
            <div style={{ textAlign: 'left' }}><Link style={linkStyle} to="/">&lt; Back to Shitposts</Link></div>
            <h1 style={{ color: bgColor.toCSSColor() }}>Generate some fucking shitposts</h1>
            <textarea disabled={this.state.disableTextArea} style={textAreaStyle} placeholder="YOUR SHITPOST HERE" onChange={(e) => this.textChange(e.target.value)} />
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={reCAPTCHAKey}
              onChange={this.submit}
            />
            <RoundedSubmitButton disabled={this.state.disableTextArea} color={bgColor.toCSSColor()} invertedColor={invertedColor.toCSSColor()} onClick={this.validateAndSubmit} />
            {(this.state.url) ? <div style={{ padding: 10 }}><Link style={linkStyle} to={this.state.url}>Here's your link!</Link></div> : <div></div>}
          </div>
        </div>
        <ShitpostSpeech />
      </div>
    )
  }
}