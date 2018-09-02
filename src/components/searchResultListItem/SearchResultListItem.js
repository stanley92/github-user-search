// @flow

import * as React from 'react';
import type { Element } from 'react';

type PropsType = {
    resultItem: Object
};

const SearchResultListItem = ({ searchResults, onResultClick }: PropsType): Element<'div'> => {
    console.log('Checking Search Results : ', searchResults);
    return (
        <div className="search-result-list-wrapper">
            Search Result List
        </div>
    );
};

export default SearchResultListItem;
