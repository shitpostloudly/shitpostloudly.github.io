import { Component } from 'react'
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

const speechUtteranceChunker = function (utt, settings, callback) {
  if (!(utt instanceof window.SpeechSynthesisUtterance)) { callback(false); return; }
  settings = settings || {};
  var chunkLength = (settings && settings.chunkLength) ? settings.chunkLength : 160;
  var pattRegex = new RegExp('^.{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^.{1,' + chunkLength + '}$|^.{1,' + chunkLength + '} ');
  var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
  var chunkArr = txt.match(pattRegex);

  if (chunkArr && chunkArr[0] !== undefined && chunkArr[0].length > 2) {
      var chunk = chunkArr[0];
      var newUtt = new SpeechSynthesisUtterance(chunk.replace(/^\./,''));
      for (let x in utt) {
        newUtt["lang"] = utt["lang"]
        if (utt.hasOwnProperty(x) && x !== 'text') {
            newUtt[x] = utt[x];
        }
      }
      newUtt.onend = function () {
          settings.offset = settings.offset || 0;
          settings.offset += chunk.length - 1;
          speechUtteranceChunker(utt, settings, callback);
      }
      window.TEMP_UTT= newUtt; //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
      //placing the speak invocation inside a callback fixes ordering and onend issues.
      setTimeout(function () {
          speechSynthesis.speak(newUtt);
      }, 0);
  } else {
      //call once all text has been spoken...
      if (callback !== undefined) {
          callback(true);
      }
  }
}

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
    let preShitpost = (this.props.shitpost) ? emojiStripper(this.props.shitpost) : ''
    let rate = Math.min(1.5, Math.max(1, preShitpost.split(' ').length/200))
    //preShitpost = preShitpost.replace("\"", "").split(/[)(.;](\s+)/g).filter(x => x);
    //preShitpost.forEach(shitpost => {
    let shitpost = (preShitpost) ? preShitpost : 'hi'
    const utterance = new Utterance(shitpost)
    utterance.rate = rate
    const francDetection = langs.where("3", franc(shitpost))
    if (francDetection) {
      utterance.lang = francDetection["1"]
      speechUtteranceChunker(utterance, {}, (success) => {
        if (!success) Synth.speak(utterance)
      })
    } else {
      guessLanguage.detect(shitpost, (code) => {
        utterance.lang = code
        speechUtteranceChunker(utterance, {}, (success) => {
          if (!success) Synth.speak(utterance)
        })
      })
    }
    //})
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