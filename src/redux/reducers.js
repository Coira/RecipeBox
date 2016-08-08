import {Map, List, fromJS} from 'immutable';

//TODO split recipe reducers from other reducers

export default function reducer(state = fromJS({recipes: {}}), action) {

    let recipes = "";
    
    switch(action.type) {
	case 'ADD_RECIPE':
	    recipes = state.get("recipes");
	    //const updatedRecipes = recipes.push(action.recipe);
	    const recipe = action.recipe;
	    const key = recipe.url
	    const updatedRecipes = recipes.set(key, recipe);
	    return state.set("recipes", updatedRecipes);
	/*case 'GET_RECIPES':
	    return state.get("recipes");
	case 'GET_RECIPE':
	    recipes = state.get("recipes");
	    const index = Number(action.index);
	    return recipes.get(index);*/
	case 'REMOVE_RECIPE': return state;
	case 'EDIT_RECIPE': return state;

	case 'FIX_HEADER':
	    // fixes titlebar to top of screen when scrolling
	    return state.set("fixHeader", action.value);
	    
	case 'SET_SHOW_RECIPE_MODAL':
	    // show modal where user can add or edit recipes
	    return state.set("showRecipeModal", action.value);
	    
	default:
	    return state;
    }
}
