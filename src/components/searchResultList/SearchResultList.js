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
                <thead className="table-header-wrapper">
                    <tr className="table-row">
                        <th className="index">#</th>
                        <th className="avatar">Avatar</th>
                        <th className="username">Username</th>
                    </tr>
                </thead>
                <tbody className="table-body-wrapper">
                    {
                        searchResults.map((item, index) => (
                            <tr className="table-row" onClick={() => onResultClick(item)} key={item.id}>
                                <td className="index">{index + 1}</td>
                                <td className="avatar"><img className="avatar-logo" src={item.avatar_url} alt={index} /></td>
                                <td className="username">{item.login}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    );
};

export default SearchResultList;
