import { Component } from 'react'
import PropType from 'prop-types'

export default class ShitpostSayer extends Component {
  constructor() {
    super()
    this.state = {
      synth: (window.speechSynthesis) ? window.speechSynthesis : null
    }
  }
  componentDidMount() {
    window.addEventListener("beforeunload", () => window.speechSynthesis.cancel())
  }
  componentDidUpdate() {
    const synth = this.state.synth
    if (!synth) return
    synth.cancel()
    const shitpost = (this.props.shitpost) ? this.props.shitpost : ''
    const utterance = new SpeechSynthesisUtterance(shitpost)
    utterance.rate = Math.min(2, Math.max(1, shitpost.length/800))
    synth.speak(utterance)
  }
  render() {
    return null
  }
}
ShitpostSayer.defaultProps = {
  shitpost: ''
}
ShitpostSayer.propTypes = {
  shitpost: PropType.string
}