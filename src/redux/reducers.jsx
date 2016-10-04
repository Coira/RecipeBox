import { fromJS } from 'immutable';

const defaultState = fromJS({
    recipes: {},
    wipRecipe: {},
    editing: false,
});

export default function reducer(state = defaultState, action) {    
    switch (action.type) {
        case 'NEW_RECIPE': {  
            // open the modal so user can input a new recipe
            $('.modal').show();
            $('.autofocus').focus();
            const nextState = state.set('wipRecipe', {});
            return nextState.set('editing', false);
        }
        case 'ADD_RECIPE': {
            // add a new recipe from the modal to state
            $('.modal').hide();
            const recipes = state.get('recipes');
            const recipe = action.recipe;
            const key = recipe.url;
            const updatedRecipes = recipes.set(key, recipe);
            return state.set('recipes', updatedRecipes);
        }
        case 'DELETE_RECIPE': {
            const recipes = state.get('recipes');
            return state.set('recipes', recipes.delete(action.id));
        }
        case 'EDIT_RECIPE': {
            // open the modal with pre-existing recipe
            $('.modal').show();
            const nextState = state.set('editing', true);
            return nextState.set('wipRecipe', state.get('recipes')
                                                   .get(action.id));
        }
        case 'FIX_HEADER':
            // fixes titlebar to top of screen when scrolling
            return state.set('fixHeader', action.value);
            
        default:
            return state;
    }
}
