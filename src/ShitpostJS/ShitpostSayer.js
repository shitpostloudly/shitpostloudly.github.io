import { Component } from 'react'
import PropType from 'prop-types'

export default class ShitpostSayer extends Component {
  constructor() {
    super()
    this.state = {
      synth: (window.speechSynthesis) ? window.speechSynthesis : null
    }
  }
  componentDidUpdate() {
    const synth = this.state.synth
    if (!synth) return
    synth.cancel()
    synth.speak(new SpeechSynthesisUtterance(this.props.shitpost))
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