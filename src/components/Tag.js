import React from 'react';

const Tag = ({name}) => (
    <div className="tag">{name}</div>
);

Tag.propTyes = {
    name: React.PropTypes.string.isRequired
}


export default Tag;
    
