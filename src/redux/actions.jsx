export function addRecipe(recipe) {
    return {
        type: 'ADD_RECIPE',
        recipe,
    };
}

export function deleteRecipe(id) {
    return {
        type: 'DELETE_RECIPE',
        id,
    };
}

export function editRecipe(id) {
    return {
        type: 'EDIT_RECIPE',
        id,
    };
}

export function fixHeader(value) {
    return {
        type: 'FIX_HEADER',
        value,
    };
}

export function setShowRecipeModal(value) {
    return {
        type: 'SET_MODAL_VISIBILITY',
        value,
    };
}

