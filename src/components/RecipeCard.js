import React from 'react';
import { connect } from 'react-redux';

const Recipe = (props) => {
    if (props.recipe) {
	const recipe = props.recipe;
	
	const ingredientCategories = Object.keys(recipe.ingredients);
	const methodCategories = Object.keys(recipe.method);

	return (
	    <div>
		<div className="recipeTitle">{recipe.name}</div>
		
		<div className="ingredientsPanel">
		    {
			ingredientCategories.map((category, key) => {
			    return (
				<div className="ingCat" key={"icat" + key}>
				    {category} 
				    {
					
					recipe.ingredients[category].
					       map((item, key) => {
						   return (<div className="item"
								key={"ing" + key}>{item}</div>)
					       })
				    }
				</div>
			    )}
			)
			    
		    }	
		</div>

		<div className="methodPanel">
		    {
			methodCategories.map((category, key) => {
			    return (
				<div className="methCat" key={"mcat"+key}>
				    {category}
				    {
					recipe.method[category].
					       map((instruction, key) => {
						   return (<div className="instruction"
								key={"inst" + key}>{instruction}</div>)
					       })
					    
				    }
				</div>
			    )}
			)
		    }
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

/*			props.recipe.ingredients.main.map((item, key) => {
   return (<div key={key}
   className="item">{item}</div>)
   })*/
