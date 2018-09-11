import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MakeAShitpost from './MakeAShitpost'

import { App } from './App';
import GATracker from './components/GATracker'

const DefaultRouter = () => {
  return (
    <Router>
      <GATracker>
        <Switch>
          <Route path="/make-a-shitpost" component={MakeAShitpost} />
          <Route path="/:id" component={App} />
          <Route exact path="/" component={App} />
        </Switch>
      </GATracker>
    </Router>
  )
}

export default DefaultRouter;
