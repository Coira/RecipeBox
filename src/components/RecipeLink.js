import React from 'react';

const RecipeLink = ({name, prepTime, cookTime, serves, link}) => (
    <div className = "recipeLink panel">{name}</div>
);

RecipeLink.propTypes = {
    name: React.PropTypes.string.isRequired,
    prepTime: React.PropTypes.string,
    cookTime: React.PropTypes.string,
    serves: React.PropTypes.number,
    link: React.PropTypes.string.isRequired
};

export default RecipeLink;
