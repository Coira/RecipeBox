import { fromJS } from 'immutable';

// TODO split recipe reducers from other reducers

export default function reducer(state = fromJS({ recipes: {} }), action) {    
    switch (action.type) {
        case 'ADD_RECIPE': {
            const recipes = state.get('recipes');
            // const updatedRecipes = recipes.push(action.recipe);
            const recipe = action.recipe;
            const key = recipe.url;
            const updatedRecipes = recipes.set(key, recipe);
            return state.set('recipes', updatedRecipes);
        }
            
        case 'DELETE_RECIPE': return state;
        case 'EDIT_RECIPE': return state;

        case 'FIX_HEADER':
            // fixes titlebar to top of screen when scrolling
            return state.set('fixHeader', action.value);
            
        case 'SET_MODAL_VISIBILITY':
            // show modal where user can add or edit recipes
            return state.set('modalVisibility', action.value);
            
        default:
            return state;
    }
}
