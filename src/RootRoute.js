import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MakeAShitpost from './MakeAShitpost'

import { App } from './App';
import GATracker from './components/GATracker'

const DefaultRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/make-a-shitpost" component={GATracker(MakeAShitpost)} />
        <Route path="/:id" component={GATracker(App)} />
        <Route exact path="/" component={GATracker(App)} />
      </Switch>
    </Router>
  )
}

export default DefaultRouter;
