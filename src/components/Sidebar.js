import React from 'react';
import TagsContainer from './TagsContainer';

const Sidebar = ({tags}) => (
    <div className="sidebar">Sidebar
	<TagsContainer tags={tags}/>
    </div>
);

export default Sidebar;
    
