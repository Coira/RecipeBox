import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import RecipeLinkContainer from './RecipeLinkContainer';
import * as actionCreators from '../redux/actions';

const Home = (props) => (
    <div>
        <RecipeLinkContainer
            rps={props.recipes}
            editFtn={props.actions.editRecipe}
            deleteFtn={props.actions.deleteRecipe}
        />
    </div>
);


const mapStateToProps = (state) => (
    {
        recipes: state.get('recipes'),
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators(actionCreators, dispatch),
    }
);


const ConnectedHome = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default ConnectedHome;
