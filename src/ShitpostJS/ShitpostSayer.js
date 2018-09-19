import { Component } from 'react'
import PropType from 'prop-types'
import MeSpeak from 'mespeak'

/**
 * Fuck y'all mojis, they take too long to speak
 * @param {string} input
 */
const emojiStripper = (input) => {
  var result = '';
  if (input.length === 0)
      return input;
  for (var indexOfInput = 0, lengthOfInput = input.length; indexOfInput < lengthOfInput; indexOfInput++) {
      var charAtSpecificIndex = input[indexOfInput].charCodeAt(0);
      if ((32 <= charAtSpecificIndex) && (charAtSpecificIndex <= 126)) {
          result += input[indexOfInput];
      }
  }
  return result;
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
    const Synth = this.state.Synth
    const Utterance = this.state.Utterance
    if (!(Synth && Utterance)) return
    Synth.cancel()
    const shitpost = (this.props.shitpost) ? emojiStripper(this.props.shitpost) : ''
    const utterance = new Utterance(shitpost)
    utterance.rate = Math.min(1.5, Math.max(1, shitpost.split(' ').length/200))
    Synth.speak(utterance)
  }
  render() {
    return null
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