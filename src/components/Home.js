import React from 'react';
import RecipeLinkContainer from './RecipeLinkContainer';

const Home = ({recipes}) => (
    <div>
	<RecipeLinkContainer recipes={recipes}/>
    </div>
);

export default Home;
