import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import RecipeCard from './components/RecipeCard';

import { Router, Route, browserHistory } from 'react-router';


import './style.scss';



ReactDOM.render((
    <Router history={browserHistory}>
	<Route path="/" component={App}/>
	<Route path="/recipes/:recipeLink" component={RecipeCard}/>
    </Router>
), document.getElementById('app'));
