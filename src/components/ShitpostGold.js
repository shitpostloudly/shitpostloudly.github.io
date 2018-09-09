import React from 'react';
/**
 * Shitpost Gold banner
 * @param { id } ID a matching identifier
 */
export const ShitpostGold = ({ id, show=false }) => {
  if (show)
    return (<span className="corner-banner"><a>Shitpost Gold&trade; certified</a></span>);
  else
    return null;
};