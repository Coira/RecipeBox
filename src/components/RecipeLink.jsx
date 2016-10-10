import React from 'react';
import NavLink from './NavLink';

const RecipeLink = ({ name, prepTime, cookTime, serves, img, url,
                      editFtn, deleteFtn }) => (
                          
    <div className="recipeLink flexRow">
        <div className="foodInfo">
            <NavLink to={`/recipes/${url}`}>
                <div className="foodImg">
                    <img
                        src={img}
                        height="150"
                        width="150"
                        alt="food_pic"
                    />
                </div>
            </NavLink>
            <div className="text flexCol">
                <div className="top">
                    <div className="title">{name}</div>
                    <div className="serves">
                        {serves ? `Serves: ${serves}` : ''}</div>
                </div>
                <div className="bottom">
                    <div className="prepTime">
                        {prepTime ? `Prep Time: ${prepTime}` : ''}
                    </div>
                    <div className="cookTime">
                        {cookTime ? `Cook Time: ${cookTime}` : ''}
                    </div>
                </div>
            </div>
        </div>
        
        <div className="iconCont flexRow">
            <div className="icon">E</div>
            <div className="icon">D</div>
            <button
                onClick={() => {
                    editFtn(url);
                }}
            >b</button>
            <button
                onClick={() => {
                    deleteFtn(url);
                }}
            >d</button>
        </div>
        
    </div>
);

RecipeLink.propTypes = {
    name: React.PropTypes.string.isRequired,
    img: React.PropTypes.string,
    prepTime: React.PropTypes.string,
    cookTime: React.PropTypes.string,
    serves: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
};

export default RecipeLink;
