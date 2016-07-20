import React from 'react';
import RecipeLink from './RecipeLink';

const RecipeLinkContainer = ({recipes}) => {
    return (
	<div id="recipeLinkContainer">
	    {
		recipes.map((recipe) => {
		    //const recipe = record.recipe;

		    return (
			<RecipeLink
			    key={recipe.id}
			    name={recipe.name}
			    prepTime={recipe.prep_time}
			    cookTime={recipe.cook_time}
			    serves={recipe.serves}
			    link='#'/>
		    )
		})	   
	    }
	</div>
    );
};

RecipeLinkContainer.propTypes = {
    recipes: React.PropTypes.array.isRequired
};

export default RecipeLinkContainer;
