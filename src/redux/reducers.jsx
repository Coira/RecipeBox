import { fromJS } from 'immutable';

// TODO split recipe reducers from other reducers

export default function reducer(state = fromJS({ recipes: {}, wipRecipe: {} }),
                                action) {    
    switch (action.type) {
        case 'ADD_RECIPE': {
            const recipes = state.get('recipes');
            // const updatedRecipes = recipes.push(action.recipe);
            const recipe = action.recipe;
            const key = recipe.url;
            const updatedRecipes = recipes.set(key, recipe);
            const nextState = state.set('wipRecipes', {});
            return nextState.set('recipes', updatedRecipes);
        }
        case 'DELETE_RECIPE': {
            const recipes = state.get('recipes');
            return state.set('recipes', recipes.delete(action.id));
        }
        case 'EDIT_RECIPE':
            $('.modal').show();
            return state.set('wipRecipe', state.get('recipes')
                                               .get(action.id));
        case 'FIX_HEADER':
            // fixes titlebar to top of screen when scrolling
            return state.set('fixHeader', action.value);
            
        default:
            return state;
    }
}
