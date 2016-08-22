import { connect } from 'react-redux';
import React from 'react';
import RecipeLinkContainer from './RecipeLinkContainer';

const Home = (props) => {
    const recipes = props.recipes;
    return (
        <div>
            <RecipeLinkContainer rps={recipes} />
        </div>
    );
};

const mapStateToProps = (state) => (
    {
        recipes: state.get('recipes'),
    }
);

const ConnectedHome = connect(
    mapStateToProps,
    null
)(Home);

export default ConnectedHome;
