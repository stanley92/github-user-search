// @flow

import * as React from 'react';
import type { Element } from 'react';

import './searchResultList.css';

type PropsType = {
    searchResults: Array<Object>,
    onResultClick: (resultItem: Object) => void
};

const SearchResultList = ({ searchResults, onResultClick }: PropsType): Element<'div'> => {
    console.log('Checking Search Results : ', searchResults);
    return (
        <div className="search-result-list-wrapper">
            <table className="result-list">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avartar</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        searchResults.map((item, index) => (
                            <tr onClick={() => onResultClick(item)} key={item.id}>
                                <th className="result-item-wrapper">{index + 1}</th>
                                <td><img className="result-item-avatar" src={item.avatar_url} alt={index} /></td>
                                <td>{item.login}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    );
};

export default SearchResultList;
