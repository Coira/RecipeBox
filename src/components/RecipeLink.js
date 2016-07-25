import React from 'react';

const imgUrl = "/imgs/";

const RecipeLink = ({name, prepTime, cookTime, serves, img, link}) => (
    <div className = "recipeLink flexRow">

	<div className="foodInfo">
	    <div className="foodImg">
		<img src={imgUrl+img} height="150"
		     width="150" alt="food_pic"></img>
	    </div>
	    <div className="text flexCol">
		<div className="top">
		    <div className="title">{name}</div>
		    <div className="serves">Serves: {serves}</div>
		</div>
		<div className="bottom">
		    <div className="prepTime">Prep Time: {prepTime}</div>
		    <div className="cookTime">Cook Time: {cookTime}</div>
		</div>
	    </div>
	</div>
	
	<div className="iconCont flexRow">
	    <div className="icon">E</div>
	    <div className="icon">D</div>
	</div>

    </div>
);

RecipeLink.propTypes = {
    name: React.PropTypes.string.isRequired,
    img: React.PropTypes.string,
    prepTime: React.PropTypes.string,
    cookTime: React.PropTypes.string,
    serves: React.PropTypes.number,
    link: React.PropTypes.string.isRequired
};

export default RecipeLink;
