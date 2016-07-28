import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import RecipeCard from './components/RecipeCard';
import Home from './components/Home';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';


import './style.scss';



ReactDOM.render((
    <Router history={browserHistory}>
	<Route path="/" component={App}>
	    <IndexRoute  component={Home}/>
	    <Route path="/:recipeLink" component={RecipeCard}/>
	</Route>
    </Router>
), document.getElementById('app'));
