// @flow

import * as React from 'react';
import type { Element } from 'react';

type PropsType = {
    searchResults: Array<Object>,
    onResultClick: (resultItem: Object) => void
};

const SearchResultList = ({ searchResults, onResultClick }: PropsType): Element<'div'> => {
    console.log('Checking Search Results : ', searchResults);
    return (
        <div className="search-result-list-wrapper">
            {
                searchResults.map((item, index) => (
                    <div className="result-item-wrapper" key={item.id}>
                        <img className="result-item-avatar" src={item.avatar_url} alt={index} />
                        <div className="login">{item.login}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default SearchResultList;
