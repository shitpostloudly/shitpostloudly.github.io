import React, { Component } from 'react';
import { ShitpostCentral, ShitpostSpeech } from './ShitpostJS';
import FunnyOnes from './ShitpostJS/FunnyOnes';
import { GColor } from './utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { rand255 } from './utils/rand255';
import { restrictBetween } from './utils/restrictBetween';
import { ShitpostGold } from "./components/ShitpostGold";
import { DisplayShitpost } from "./components/DisplayShitpost";
import EntityParser from 'he'

import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    const preId = props.match.params.id;
    const id = (FunnyOnes.hasOwnProperty(preId)) ? FunnyOnes[preId] : preId;
    const color = new GColor(0, 0, 0);
    this.state = {
      id: id,
      shitpost: '',
      backgroundColor: color
    };
  }
  componentDidMount() {
    if (!this.state.id)
      ShitpostCentral.getRandomRedditShitpost().then(x => this.setState({ 
        shitpost: EntityParser.decode(EntityParser.decode(x)) // reddit does a shit job at managing html entities
      }));
    else
      ShitpostCentral.getGlotIoShitpost(this.state.id).then(x => {
        this.setState({ shitpost: x });
      });
    this.setState({ backgroundColor: new GColor(rand255(), rand255(), rand255()) });
  }
  render() {
    const shitpost = this.state.shitpost;
    const bgColor = this.state.backgroundColor;
    const restrict = restrictBetween(0, 125);
    document.body.style.backgroundColor = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`;
    const color = `rgb(${restrict(bgColor.r * 0.7)}, ${restrict(bgColor.g * 0.7)}, ${restrict(bgColor.g * 0.7)})`;
    return (<div>
      <ShitpostGold id={this.props.match.params.id} show={FunnyOnes[this.props.match.params.id]} />
      <DisplayShitpost color={color} shitpost={shitpost} />
      <div className="social-btns" style={{ position: 'fixed', bottom: 0, right: 0 }}>
        <a className="btn github" href="https://github.com/shitpostloudly/shitpostloudly.github.io"><FontAwesomeIcon className="fa" icon={faGithubAlt} /></a>
      </div>
      <ShitpostSpeech shitpost={shitpost} />
    </div>);
  }
}