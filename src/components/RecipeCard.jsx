import React from 'react';
import { connect } from 'react-redux';

const imgUrl = '/imgs/';

// Makes every word start with a capital letter
function titlise(title) {
    return (title.split(' ').map((word) =>
        (word.charAt(0).toUpperCase() + word.substr(1))).join(' '));
}

const Recipe = (props) => {
    if (props.recipe) {
        const recipe = props.recipe;
        const img = imgUrl + (recipe.img ? recipe.img : 'generic.jpeg');
        const ingredientCategories = Object.keys(recipe.ingredientSections);
        const methodCategories = Object.keys(recipe.methodSections);

        console.log(JSON.stringify(recipe.ingredientSections));
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
                                ingredientCategories.map((category, ikey) => (
                                    <div className="category" key={`icat${ikey}`}>
                                        <div className="catTitle"> {titlise(category)} </div>
                                        <ul>
                                            {
                                                
                                                recipe.ingredientSections[category]
                                                      .map((item, rkey) => (
                                                          <div
                                                              className="item"
                                                              key={`ing${rkey}`}
                                                          >
                                                              <li>{item}</li>
                                                          </div>
                                                      ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="methodPanel">
                            {
                                methodCategories.map((category, key) => (
                                    <div className="category" key={`mcat${key}`}>
                                        <div className="catTitle"> {titlise(category)} </div>
                                        <ol>
                                            {
                                                recipe.methodSections[category]
                                                      .map((instruction, rkey) => (
                                                          <div
                                                              className="instruction"
                                                              key={`inst${rkey}`}
                                                          >
                                                              <li>{instruction}</li>
                                                          </div>
                                                      )) 
                                            }
                                        </ol>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return (<div>Loading..</div>);
};

const mapStateToProps = (state, ownProps) => {
    const recipes = state.get('recipes');
    const key = ownProps.params.url;
    
    return {
        recipe: recipes.get(key),
    };
};

const ConnectedRecipeCard = connect(
    mapStateToProps,
    null
)(Recipe);

export default ConnectedRecipeCard;
