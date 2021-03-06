import React from 'react';
import { Map } from 'immutable';
import RecipeLink from './RecipeLink';

const recipesDefault = new Map();

const RecipeLinkContainer = ({ rps, editFtn, deleteFtn }) => {
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
                        editFtn={editFtn}
                        deleteFtn={deleteFtn}
                    />
              ))
            }
        </div>
    );  
};


RecipeLinkContainer.propTypes = {
    rps: React.PropTypes.object,
    editFtn: React.PropTypes.func,
    deleteFtn: React.PropTypes.func,
};

export default RecipeLinkContainer;
