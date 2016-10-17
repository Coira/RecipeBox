import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import NavLink from './NavLink';

const RecipeLink = ({ name, prepTime, cookTime, serves, img, url,
                      editFtn, deleteFtn }) => (
                          
    <div className="recipeLink flexRow">
        <div className="foodInfo">
            <NavLink to={`/recipes/${url}`}>
                <div className="foodImg">
                    <img
                        src={img}
                        height="130"
                        width="180"
                        alt="food_pic"
                    />
                </div>
            </NavLink>
            <div className="text flexCol">
                <div className="top">
                    <NavLink to={`/recipes/${url}`}>
                        <div className="title">{name}</div>
                    </NavLink>
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
            <ButtonToolbar>
                <Button
                    bsStyle="primary"
                    onClick={
                        () => {
                            editFtn(url);
                        }}
                >
                    Edit
                </Button>
                
                <Button
                    bsStyle="danger"
                    onClick={
                        () => {
                            deleteFtn(url);
                        }}
                >Delete</Button>
            </ButtonToolbar>
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
