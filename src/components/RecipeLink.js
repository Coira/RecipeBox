import React from 'react';

const RecipeLink = ({title, link}) => (
    <div className = "recipeLink">{title}</div>
);

RecipeLink.propTypes = {
    title: React.PropTypes.string.isRequired,
    link: React.PropTypes.string
};

export default RecipeLink;
