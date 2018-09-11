import PropTypes from 'prop-types';
import React from 'react';
import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize('UA-125467783-1');

export default class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
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