import React from 'react';
import RecipeLink from './RecipeLink';

const recipesDefault = [];

const RecipeLinkContainer = ({recipes}) => {

    recipes = recipes || recipesDefault;

    return (
	<div id="recipeLinkContainer">
	    {
		recipes.map((recipe) => {

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
