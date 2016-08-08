import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ConnectedRecipeCard from './components/RecipeCard';
import ConnectedHome from './components/Home';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import * as actionCreators from './redux/actions';

import './style.scss';

// TODO instead of dumping all the actions / states in one map*ToProps
// look at reducer composition

const mapStateToProps = (state) => {
    return {
	recipes: state.get("recipes"),
	fixHeader: state.get("fixHeader"),
	showRecipeModal: state.get("showRecipeModal")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
	actions: bindActionCreators(actionCreators, dispatch)
    }
}

export const RecipeBoxApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);



ReactDOM.render(
    <Provider store={store}>
	<Router history={browserHistory}>
	    <Route path="/" component={RecipeBoxApp}>
		<IndexRoute  component={ConnectedHome}/>
		<Route path="/recipes/:url"
		       component={ConnectedRecipeCard}/>
	    </Route>
	</Router>	
    </Provider>
, document.getElementById('app'));
