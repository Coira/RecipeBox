import React from 'react';
import RecipeLink from './RecipeLink';
import {Map} from 'immutable';

const recipesDefault = new Map();

const RecipeLinkContainer = ({recipes}) => {

    recipes = recipes || recipesDefault;
    const sortedRecipes = recipes.sortBy(recipe => recipe.url);

    
    return (
	<div id="recipeLinkContainer">
	    {
		sortedRecipes.valueSeq().map((recipe) => {
		    return (
			<RecipeLink
			    key={recipe.id}
			    url={recipe.url}
			    name={recipe.name}
			    prepTime={recipe.prep_time}
			    cookTime={recipe.cook_time}
			    serves={recipe.serves}
			    img={recipe.img}/>
		    )
		})	   
	    }
	</div>
    );
    
};


/*
RecipeLinkContainer.propTypes = {
    recipes: React.PropTypes.array.isRequired
};
*/

export default RecipeLinkContainer;
