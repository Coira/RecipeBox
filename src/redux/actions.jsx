// allows user to enter a new recipe
export function newRecipe() {
    return {
        type: 'NEW_RECIPE',
    };
}

// add new user inputted recipe to state
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

// allows user to edit an old recipe
export function editRecipe(id) {
    return {
        type: 'EDIT_RECIPE',
        id,
    };
}

// fixes the titlebar to top of screen when scrolling
export function fixHeader(value) {
    return {
        type: 'FIX_HEADER',
        value,
    };
}
