import React from 'react';
import RecipeLink from './RecipeLink';

const recipes = ["recipe 1", "recipe 2", "recipe 3", "recipe 4"];

const RecipesContainer = () => (
    <div className="recipesContainer">Recipes
	{
	    recipes.map((recipe) => (
		<RecipeLink title={recipe}/>))
	}
    </div>
);

export default RecipesContainer;
