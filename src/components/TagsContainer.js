import React from 'react';
import Tag from './Tag';

//const tagsList = ["one", "two", "three", "lots"];

const TagsContainer = ({tags}) => {
    return (
	<div className="tagsContainer">
	    {
		tags.map((tag) => (<Tag key={tag}
					    name={tag}/>))
	    }
	</div>
    );
};


export default TagsContainer;
