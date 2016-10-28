import React from 'react';
import classnames from 'classnames';
import NavLink from './NavLink';

const TitleBar = (props) => (
    <div>
        <div id="titleBar" className="flexCol">
            <div className="title">Recipe Box</div>
            
            <div
                className={classnames({ fixedHeader: props.fixHeader },
                                      'titleLinks')}
            >
                <NavLink to={'/RecipeBox'}>
                    <div className="link">
                        Home
                    </div>
                </NavLink>
                <div
                    className="link"
                    onClick={props.onAdd}
                >
                    Add Recipe
                </div>
            </div>

        </div>

    </div>
);

TitleBar.propTypes = {
    fixHeader: React.PropTypes.bool,
    onAdd: React.PropTypes.func,
};

export default TitleBar;
