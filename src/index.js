import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteRoute from './RootRoute';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouteRoute />, document.getElementById('root'));
registerServiceWorker();
