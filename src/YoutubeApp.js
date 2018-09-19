import React, { Component } from 'react';
import { ShitpostCentral, ShitpostSpeech } from './ShitpostJS';
import FunnyOnes from './ShitpostJS/FunnyOnes';
import { GColor, idealColorFunction, changeLuminosity } from './utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { rand255 } from './utils/rand255';
import { ShitpostGold } from "./components/ShitpostGold";
import { DisplayShitpost } from "./components/DisplayShitpost";
import EntityParser from 'he'

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params
    const isFunnies = (FunnyOnes.hasOwnProperty(props.match.url))
    const id = (isFunnies) ? FunnyOnes[props.match.url] : params.id;
    const color = new GColor(0, 0, 0);
    this.state = {
      id: id,
      gold: isFunnies,
      shitpost: '',
      backgroundColor: color
    };
  }
  componentDidMount() {
    if (!this.state.id)
      this.setState({ 
        shitpost: 'Random Youtube videos not supported at the moment. This is a great shitpost, right?'
      })
    else
      ShitpostCentral.getYoutubeTranscriptShitpost(this.state.id).then(x => {
        this.setState({ shitpost: EntityParser.decode(x) });
      });
    this.setState({ backgroundColor: new GColor(rand255(), rand255(), rand255()) });
  }
  render() {
    const shitpost = this.state.shitpost
    const bgColor = this.state.backgroundColor
    const lighterBg = changeLuminosity(bgColor, 0.7)
    const darkerBg = changeLuminosity(bgColor, -0.6)
    const shitpostBg = idealColorFunction(lighterBg, darkerBg)(bgColor)
    const shitpostColor = idealColorFunction(new GColor(255, 255, 255), new GColor(0, 0, 0))(shitpostBg)
    document.body.style.backgroundColor = bgColor.toCSSColor()
    return (<div>
      <ShitpostGold show={this.state.gold} />
      <DisplayShitpost color={shitpostColor.toCSSColor()} backgroundColor={shitpostBg.toCSSColor()} shitpost={shitpost} />
      <div className="social-btns" style={{ position: 'fixed', bottom: 0, right: 0 }}>
        <a className="btn github" href="https://github.com/shitpostloudly/shitpostloudly.github.io"><FontAwesomeIcon className="fa" icon={faGithubAlt} /></a>
      </div>
      <ShitpostSpeech shitpost={shitpost} />
    </div>);
  }
}