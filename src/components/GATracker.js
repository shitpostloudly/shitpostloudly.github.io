import PropTypes from 'prop-types';
import React from 'react';
import GoogleAnalytics from 'react-ga';
import { withRouter } from 'react-router';

class GAListener extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { history } = this.props;
    GoogleAnalytics.initialize('UA-125467783-1', { debug: false });
    this.sendPageView(history.location);
    history.listen(this.sendPageView);
  }

  sendPageView(location) {
    GoogleAnalytics.set({ page: location.pathname+location.search });
    GoogleAnalytics.pageview(location.pathname+location.search);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(GAListener);