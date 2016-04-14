import React from 'react';

const RecipeLink = ({name, prepTime, cookTime, serves, tags, link}) => (
    <div className = "recipeLink">{name}</div>
);

RecipeLink.propTypes = {
    name: React.PropTypes.string.isRequired,
    prepTime: React.PropTypes.string.isRequired,
    cookTime: React.PropTypes.string,
    serves: React.PropTypes.number,
    tags: React.PropTypes.array.isRequired,
    link: React.PropTypes.string.isRequired
};

export default RecipeLink;
