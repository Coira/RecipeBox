/*export function getRecipe(index) {
    return {
	type: "GET_RECIPE",
	index
    }
}

export function getRecipes() {
    return {
	type: "GET_RECIPES"
    }
}*/

export function addRecipe(recipe) {
    return {
	type: "ADD_RECIPE",
	recipe
    }
}

export function removeRecipe(id) {
    return {
	type: "REMOVE_RECIPE",
	id
    }
}

export function editRecipe(id) {
    return {
	type: "EDIT_RECIPE",
	id
    }
}

export function fixHeader(value) {
    return {
	type: "FIX_HEADER",
	value
    }
}

export function setShowRecipeModal(value) {
    return {
	type: "SET_SHOW_RECIPE_MODAL",
	value
    }
}

