import React from 'react';
import { connect } from 'react-redux';

const imgUrl = "/imgs/";

// Makes every word start with a capital letter
function titlise(title) {
    return (title.split(" ").map((word) =>
	(word.charAt(0).toUpperCase() + word.substr(1))).join(" "));
}

const Recipe = (props) => {
    if (props.recipe) {
	const recipe = props.recipe;
	const img = imgUrl + (recipe.img ? recipe.img : "generic.jpeg");
	const ingredientCategories = Object.keys(recipe.ingredients);
	const methodCategories = Object.keys(recipe.method);


	return (
	    <div className="recipeCont">
		<div className="recipe flexCol">
		    
		    <div className="titleItems flexRow">
			<img src={img} alt="food_pic" width="120" height="120" />
			<div className="recipeTitle">{titlise(recipe.name)}</div>
		    </div>
		    
		    <div className="contents contentsLayout">
			<div className="ingredientsPanel">
			    {
				ingredientCategories.map((category, key) => {
				    return (
					<div className="category" key={"icat" + key}>
					    <div className="catTitle"> {titlise(category)} </div>
					    <ul>
					    {
						
						recipe.ingredients[category].
						       map((item, key) => {
							   return (<div className="item"
									key={"ing" + key}><li>{item}</li></div>)
						       })
					    }
					    </ul>
					</div>
				    )}
				)
				    
			    }	
			</div>

			<div className="methodPanel">
			    {
				methodCategories.map((category, key) => {
				    return (
					<div className="category" key={"mcat"+key}>
					    <div className="catTitle"> {titlise(category)} </div>
					    <ol>
					    {
						recipe.method[category].
						       map((instruction, key) => {
							   return (<div className="instruction"
									key={"inst" + key}><li>{instruction}</li></div>)
						       })
						    
					    }
					    </ol>
					</div>
				    )}
				)
			    }
			</div>
		    </div>
		</div>
	    </div>
	)
    }
    else {
	return (<div>Loading..</div>)
    }
}

const mapStateToProps = (state,ownProps) => {
    const index = Number(ownProps.params.index);
    const recipes = state.get("recipes");
    return {
	recipe: recipes.get(index)
    }

}

const ConnectedRecipeCard = connect(
    mapStateToProps,
    null
)(Recipe);

export default ConnectedRecipeCard;
