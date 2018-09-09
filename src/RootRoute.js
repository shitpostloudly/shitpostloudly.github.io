import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MakeAShitpost from './MakeAShitpost'

import { App } from './App';

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
