import React from 'react';
import RecipeLink from './RecipeLink';

const RecipesContainer = ({recipes}) => {
    return (
	<div className="recipesContainer">Recipes
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
			    tags={recipe.tags}
			    link='#'/>
		    )
		})	   
	    }
	</div>
    );
};

RecipesContainer.propTypes = {
    recipes: React.PropTypes.array.isRequired
};

export default RecipesContainer;
