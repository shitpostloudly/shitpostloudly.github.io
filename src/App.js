import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ShitpostCentral, ShitpostSpeech } from './ShitpostJS'
import FunnyOnes from './FunnyOnes'
import MakeAShitpost from './MakeAShitpost'

import './App.css';

const DisplayShitpost = ({shitpost=''}) => {
  return (
  <div className="ShitpostContainer">
    <div className="ShitpostCentre">
      <h1 id="content">{shitpost}</h1>
    </div>
  </div>
  )
}

const Credits = () => {
  return <div className="ShitpostCredits">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>. That's right, I actually credit other people's work. This work is protected by CC BY-SA 4.0 or whatever by NewBee.</div>
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
    else ShitpostCentral.getPastebinShitpost(this.state.id).then(x => this.setState({ shitpost: x }))
  }

  render() {
    return (
      <div>
        <DisplayShitpost shitpost={this.state.shitpost} />
        <ShitpostSpeech shitpost={this.state.shitpost} />
        <Credits />
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
