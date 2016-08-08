import React from 'react';
import NavLink from './NavLink';

const imgUrl = "/imgs/";

const RecipeLink = ({name, prepTime, cookTime, serves, img, url}) => (
    <NavLink to={"/recipes/"+url}>
	<div className = "recipeLink flexRow">

	<div className="foodInfo">
	    <div className="foodImg">
		<img src={imgUrl + (img ? img : "generic.jpeg")} height="150"
		     width="150" alt="food_pic"></img>
	    </div>
	    <div className="text flexCol">
		<div className="top">
		    <div className="title">{name}</div>
		    <div className="serves">
			{serves ? "Serves: " + serves : ""}</div>
		</div>
		<div className="bottom">
		    <div className="prepTime">
			{prepTime ? "Prep Time: " + prepTime : ""}</div>
		    <div className="cookTime">
			{cookTime ? "Cook Time: " + cookTime : ""}</div>
		</div>
	    </div>
	</div>
	
	<div className="iconCont flexRow">
	    <div className="icon">E</div>
	    <div className="icon">D</div>
	</div>

	</div>
    </NavLink>
);

RecipeLink.propTypes = {
    name: React.PropTypes.string.isRequired,
    img: React.PropTypes.string,
    prepTime: React.PropTypes.string,
    cookTime: React.PropTypes.string,
    serves: React.PropTypes.number,
    url: React.PropTypes.string.isRequired
};

export default RecipeLink;
