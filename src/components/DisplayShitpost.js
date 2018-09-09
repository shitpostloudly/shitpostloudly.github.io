import React from 'react';
import { Link } from 'react-router-dom';
import Fidget from './fidget.svg';
import './fidget.css';

export const DisplayShitpost = ({ color = 'black', shitpost = '' }) => {
  const preStyle = { color: color, fontSize: '2em', margin: 0, whiteSpace: 'pre-wrap', wordWrap: 'break-word' };
  const linkStyle = { fontSize: '1.5em', margin: 0 };
  return (<div className="ShitpostContainer">
    <div className="ShitpostCentre">
      {(shitpost) ?
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
        </div>}
    </div>
  </div>);
};