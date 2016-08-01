import React from 'react';
import RecipeLink from './RecipeLink';

const recipesDefault = [];

const RecipeLinkContainer = ({recipes}) => {

    recipes = recipes || recipesDefault;

    return (
	<div id="recipeLinkContainer">
	    {
		recipes.map((recipe, k) => {

		    return (
			<RecipeLink
			    key={recipe.id}
			    index={k}
			    name={recipe.name}
			    prepTime={recipe.prep_time}
			    cookTime={recipe.cook_time}
			    serves={recipe.serves}
			    img={recipe.img}
			    link={recipe.url}/>
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
