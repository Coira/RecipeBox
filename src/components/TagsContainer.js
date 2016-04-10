import React from 'react';
import Tag from './Tag';

const tagsList = ["one", "two", "three", "lots"];

const TagsContainer = () => (
    <div className="tagsContainer">
	{
	    tagsList.map((tag) => (<Tag label={tag}/>))
	}
    </div>
);

export default TagsContainer;
