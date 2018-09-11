import PropTypes from 'prop-types';
import React from 'react';
import GoogleAnalytics from 'react-ga';

export default class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    GoogleAnalytics.initialize('UA-125467783-1', { debug: false });
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    GoogleAnalytics.set({ page: location.pathname+location.search });
    GoogleAnalytics.pageview(location.pathname+location.search);
  }

  render() {
    return this.props.children;
  }
}