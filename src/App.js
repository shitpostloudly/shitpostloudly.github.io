import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { ShitpostCentral, ShitpostSpeech } from './ShitpostJS'
import FunnyOnes from './FunnyOnes'
import MakeAShitpost from './MakeAShitpost'
import { GColor } from './colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'

import './App.css';
import { rand255 } from './rand255';
import { restrictBetween } from './restrictBetween';

import Fidget from './fidget.svg'
import './fidget.css'

const DisplayShitpost = ({ color='black', shitpost='' }) => {
  const preStyle = { color: color, fontSize: '2em', margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' }
  const linkStyle = { fontSize: '1.5em', margin: 0 }
  return (
  <div className="ShitpostContainer">
    <div className="ShitpostCentre">
    {
      (shitpost) ?
      <div style={{ borderRadius: 15, padding: '25px 40px', backgroundColor: '#eee' }}>
        <pre style={preStyle} id="content">{shitpost}</pre>
        <div style={{ textAlign: 'center', marginTop: 20, borderTop: '1px solid #ccc', paddingTop: 10 }}>
          <Link style={linkStyle} to="/make-a-shitpost">Make your own</Link>
        </div>
      </div>
      :
      <div style={{ textAlign: 'center' }}>
        <img className="fidget" src={Fidget} style={{ display: 'inline', width: '20%' }} alt="Fidget spinner loader" />
        <h1 style={{ color: color }}>Loading...</h1>
      </div>
    }
    </div>
  </div>
  )
}

/**
 * Shitpost Gold banner
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
    const id = (FunnyOnes.hasOwnProperty(preId)) ? FunnyOnes[preId] : preId
    const color = new GColor(255, 255, 255)
    this.state = {
      id: id,
      shitpost: '',
      backgroundColor: color
    }
  }

  componentDidMount() {
    if (!this.state.id) ShitpostCentral.getRandomRedditShitpost().then(x => this.setState({ shitpost: x }))
    else ShitpostCentral.getGlotIoShitpost(this.state.id).then(x => {
      this.setState({ shitpost: x })
    })
    this.setState({ backgroundColor: new GColor(rand255(), rand255(), rand255()) })
  }

  render() {
    const shitpost = this.state.shitpost
    const bgColor = this.state.backgroundColor
    const restrict = restrictBetween(0, 125)
    document.body.style.backgroundColor = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`

    const color = `rgb(${restrict(bgColor.r*0.7)}, ${restrict(bgColor.g*0.7)}, ${restrict(bgColor.g*0.7)})`
    return (
      <div>
        <ShitpostGold id={this.props.match.params.id} />
        <DisplayShitpost color={color} shitpost={shitpost} />
        <div className="social-btns" style={{ position: 'fixed', bottom: 0, right: 0 }}>
          <a className="btn github" href="https://github.com/shitpostloudly/shitpostloudly.github.io"><FontAwesomeIcon className="fa" icon={faGithubAlt} /></a>
        </div>
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
