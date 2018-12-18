import React, { Component } from 'react'
import PropType from 'prop-types'
import MeSpeak from 'mespeak'
import franc from 'franc-min'
import { guessLanguage } from 'guesslanguage'
import langs from 'langs'
import emojiRegex from 'emoji-regex'

/**
 * Fuck y'all mojis, they take too long to speak
 * @param {string} input
 */
const emojiStripper = (input) => {
  return input.replace(emojiRegex(), '')
};

export default class ShitpostSayer extends Component {
  constructor(props) {
    super(props)
    if (window.speechSynthesis && window.SpeechSynthesisUtterance && !props.fallback) {
      this.state = {
        Utterance: window.SpeechSynthesisUtterance,
        Synth: window.speechSynthesis
      }
    } else {
      if (!MeSpeak.isVoiceLoaded('en')) MeSpeak.loadVoice(require('mespeak/voices/en/en-us.json'))
      if (!MeSpeak.isConfigLoaded()) MeSpeak.loadConfig(require('./mespeak_config.json'))
      this.state = {
        Utterance: function (text) {
          return {
              lang: 'en',
              volume: 1.0,
              onend: function () {},
              onstart: function () {},
              text: text
          };
        },
        Synth: {
          speak: (utterance) => {
            MeSpeak.speak(utterance.text, { amplitude: 100, pitch: 50, speed: 175, variant: 'klatt' })
          },
          cancel: () => {
            MeSpeak.stop();
          }
        }
      }
    }
  }
  componentDidMount() {
    if (!window.addEventListener) {
      window.onbeforeunload = function() {
        window.speechSynthesis.cancel();
      }
    } else {
      window.addEventListener("beforeunload", function() {
        window.speechSynthesis.cancel()
      })
    }
  }
  componentDidUpdate() {
    this.sayShitpost()
  }
  sayShitpost = () => {
    const Synth = this.state.Synth
    const Utterance = this.state.Utterance
    if (!(Synth && Utterance) || !this.props.shitpost) return
    Synth.cancel()
    const shitpost = (this.props.shitpost) ? emojiStripper(this.props.shitpost) : ''
    const utterance = new Utterance(shitpost)
    utterance.rate = Math.min(1.5, Math.max(1, shitpost.split(' ').length/200))
    const francDetection = langs.where("3", franc(shitpost))
    if (francDetection) {
      utterance.lang = francDetection
      Synth.speak(utterance)
    } else {
      guessLanguage.detect(shitpost, (code) => {
        utterance.lang = code
        Synth.speak(utterance)
      })
    }
  }
  render() {
    return <div style={{ display: 'none', position: 'fixed', top: -200, left: -200 }}><button ref={(ref) => this.niceLittleHack=ref} onClick={this.sayShitpost} /></div>
  }
}
ShitpostSayer.defaultProps = {
  shitpost: '',
  fallback: false,
}
ShitpostSayer.propTypes = {
  shitpost: PropType.string,
  fallback: PropType.bool,
}