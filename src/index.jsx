import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import App from './components/App';
import ConnectedRecipeCard from './components/RecipeCard';
import ConnectedHome from './components/Home';
import store from './redux/store';
import * as actionCreators from './redux/actions';

import './style.scss';

// TODO instead of dumping all the actions / states in one map*ToProps
// look at reducer composition

const mapStateToProps = (state) => (
    {
        recipes: state.get('recipes'),
        wipRecipe: state.get('wipRecipe'),  // Work In Progress Recipe
        fixHeader: state.get('fixHeader'),
    }
);


const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators(actionCreators, dispatch),
    }
);

const RecipeBoxApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default RecipeBoxApp;

ReactDOM.render(
    <Provider store={store}>
        <Router
            onUpdate={() => window.scrollTo(0, 0)}
            history={browserHistory}
        >
            <Route path="/" component={RecipeBoxApp}>
                <IndexRoute component={ConnectedHome} />
                <Route
                    path="/recipes/:url"
                    component={ConnectedRecipeCard}
                />
            </Route>
        </Router>    
    </Provider>,
    document.getElementById('app')
);
