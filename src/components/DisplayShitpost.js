import React from 'react';
import { Link } from 'react-router-dom';
import Fidget from './fidget.svg';
import { ShitpostSpeech } from '../ShitpostJS';
import './fidget.css';

export const DisplayShitpost = ({ color = 'black', backgroundColor='#eee', shitpost = '' }) => {
  const preStyle = { color: color, fontSize: '2em', margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' };
  const linkStyle = { color: color, fontSize: '1.5em', margin: 0 };
  return (<div className="ShitpostContainer">
    <ShitpostSpeech shitpost={shitpost}>
      <div className="ShitpostCentre">
        {(shitpost) ?
          <div style={{ borderRadius: 15, padding: '25px 40px', backgroundColor: backgroundColor }}>
            <pre style={preStyle} id="content">{shitpost}</pre>
            <div style={{ textAlign: 'center', marginTop: 20, borderTopColor: color, borderTopWidth: 1, borderTopStyle: 'solid', paddingTop: 10 }}>
              <Link style={linkStyle} to="/make-a-shitpost">Make your own</Link>
            </div>
          </div>
          :
          <div style={{ textAlign: 'center' }}>
            <img className="fidget" src={Fidget} style={{ display: 'inline', width: '10em', height: '10em' }} alt="Fidget spinner loader" />
            <h1 style={{ color: backgroundColor }}>Loading...</h1>
          </div>}
      </div>
    </ShitpostSpeech>
  </div>);
};