import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ShitpostCentral, ShitpostSpeech } from './ShitpostJS'
import FunnyOnes from './FunnyOnes'
import MakeAShitpost from './MakeAShitpost'
import { createColorRange, GColor} from './colors'

import './App.css';

const whiteGreen = createColorRange(new GColor(255, 255, 255), new GColor(249, 255, 96))
const redWhite = createColorRange(new GColor(214, 49, 49), new GColor(255, 255, 255))
const rand255 = () => Math.floor(Math.random()*256)

const DisplayShitpost = ({shitpost=''}) => {
  return (
  <div className="ShitpostContainer">
    <div className="ShitpostCentre">
    {
      (shitpost) ?
      <div style={{ borderRadius: 15, padding: '25px 40px', backgroundColor: '#eee' }}>
        <pre style={{ fontSize: '2em', margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} id="content">{shitpost}</pre>
      </div>
      :
      ''
    }
    </div>
  </div>
  )
}

/**
 * 
 * @param { id } ID a matching identifier
 */
const ShitpostGold = ({ id }) => {
  if (FunnyOnes[id]) return (
    <span className="corner-banner"><a>Shitpost Gold&trade; certified</a></span>
  )
  else return null
}

class App extends Component {
  constructor(props) {
    super(props)
    const preId = props.match.params.id
    const id = (FunnyOnes.hasOwnProperty(preId)) ? FunnyOnes[preId] : preId;
    this.state = {
      id: id,
      shitpost: ''
    }
  }

  componentDidMount() {
    if (!this.state.id) ShitpostCentral.getRandomRedditShitpost().then(x => this.setState({ shitpost: x }))
    else ShitpostCentral.getGlotIoShitpost(this.state.id).then(x => this.setState({ shitpost: x }))
  }

  changeColourAccordingly = async (shitpost) => {
    let sentiment = await ShitpostCentral.getEmotionOfShitpost(shitpost)
    let color = new GColor(rand255(), rand255(), rand255())
    if (sentiment >= 0.5) color = whiteGreen[Math.round(2*(sentiment - 0.5)*(whiteGreen.length-1))]
    else if (sentiment < 0.5) color = redWhite[Math.round(2*sentiment*(redWhite.length-1))]
    document.body.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
  }

  render() {
    const shitpost = this.state.shitpost
    if (shitpost) this.changeColourAccordingly(shitpost)
    return (
      <div>
        <ShitpostGold id={this.props.match.params.id} />
        <DisplayShitpost shitpost={shitpost} />
        <ShitpostSpeech shitpost={shitpost} />
      </div>
    )
  }
}

const DefaultRouter = () => {
  return (
  <Router>
    <Switch>
      <Route path="/make-a-shitpost" component={MakeAShitpost} />
      <Route path="/:id" component={App} />
      <Route exact path="/" component={App} />
    </Switch>
  </Router>
  )
}

export default DefaultRouter;
