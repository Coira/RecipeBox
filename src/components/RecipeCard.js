import React from 'react';
import { connect } from 'react-redux';

const Recipe = (props) => {
    if (props.recipe) {
	return (<div>{props.recipe.name}</div>)
    }
    else {
	return (<div>Loading..</div>)
    }
}

const mapStateToProps = (state,ownProps) => {
    const index = Number(ownProps.params.index);
    const recipes = state.get("recipes");
    return {
	recipe: recipes.get(index)
    }

}

const ConnectedRecipeCard = connect(
    mapStateToProps,
    null
)(Recipe);

export default ConnectedRecipeCard;
