import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import MakeAShitpost from './MakeAShitpost'

import { App } from './App';
import YoutubeApp from './YoutubeApp'
import RedditApp from './RedditApp'
import GATracker from './components/GATracker'

const RootRouter = () => {
  return (
    <Router>
      <GATracker>
        <Switch>
          <Route path='/r' component={RedditRouter} />
          <Route path='/yt' component={YoutubeRouter} />
          <Route path='/make-a-shitpost' component={MakeAShitpost} />
          <Route path='/:id' component={App} />
          <Route component={App} />
        </Switch>
      </GATracker>
    </Router>
  )
}

const RedditRouter = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/:subredditId/comments/:postId`} component={RedditApp} />
      <Route path={`${match.url}/:subredditId/:postId`} component={RedditApp} />
      <Route path={`${match.url}/:id`} component={RedditApp} />
    </Switch>
  )
}

const YoutubeRouter = ({ match }) => {
  return (
  <Switch>
    <Route exact path={`${match.url}/:id`} component={YoutubeApp} />
    <Route exact path={`${match.url}/`} component={YoutubeApp} />
  </Switch>
  )
}

export default RootRouter;
