import React from 'react';

const CategoryPreview = ({value}) => {
    return (
        <div>
            {value.title && <p>{value.title}</p>}
        </div>
    );
}

export default CategoryPreview;
