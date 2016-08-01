import React from 'react';
import RecipeLinkContainer from './RecipeLinkContainer';
import { connect } from 'react-redux';

const Home = (props) => {
    const recipes = props.recipes;
    return (
	<div>
	    <RecipeLinkContainer recipes={recipes}/>
	</div>
    );
};

//export default Home;
const mapStateToProps = (state) => {
    return {
	recipes: state.get("recipes")
    }
}

const ConnectedHome = connect(
    mapStateToProps,
    null
)(Home);

export default ConnectedHome;
