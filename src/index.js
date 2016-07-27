import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Route1 from './components/Route1';
import Route2 from './components/Route2';

import { Router, Route, browserHistory } from 'react-router';
//var browserHistory = 
//import { createHistory } from 'history/lib/createBrowserHistory';

import './style.scss';

//const history = createHistory();

ReactDOM.render((
    <Router history={browserHistory}>
	<Route path="/" component={App}/>
	<Route path="/route1" component={Route1}/>
	<Route path="/route2" component={Route2}/>
    </Router>
), document.getElementById('app'));
