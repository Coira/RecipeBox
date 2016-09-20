import React from 'react';
import { Map } from 'immutable';
import RecipeLink from './RecipeLink';

const recipesDefault = new Map();

const RecipeLinkContainer = ({ rps }) => {
    const recipes = rps || recipesDefault;
    const sortedRecipes = recipes.sortBy(recipe => recipe.url);
 
    return (
        <div id="recipeLinkContainer">
            {
                sortedRecipes.valueSeq().map((recipe) => (
                    <RecipeLink
                        key={recipe.url}
                        url={recipe.url}
                        name={recipe.name}
                        prepTime={String(recipe.prep_time)}
                        cookTime={String(recipe.cook_time)}
                        serves={String(recipe.serves)}
                        img={recipe.img}
                    />
              ))
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
