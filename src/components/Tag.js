import React from 'react';

const Tag = ({label}) => (
    <div className="tag">{label}</div>
);

Tag.propTyes = {
    label: React.PropTypes.string.isRequired
}


export default Tag;
    
