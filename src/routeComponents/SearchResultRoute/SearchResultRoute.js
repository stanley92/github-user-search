// @flow

import * as React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ReactPaginate from 'react-paginate';
import Spinner from 'react-spinkit';

import type { AppStateType } from '../../rootReducer';
import SearchInput from '../../components/seachInput/SearchInput';
import SearchResultList from '../../components/searchResultList/SearchResultList';

import './searchResultRoute.css';

type MappedStatePropsType = {|
    pathName: string
|};
type MappedDispatchPropsType = {};
type OwnPropsType = {};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;
type StateType = {|
    isLoading: boolean,
    loadingPageData: boolean,
    searchResults: Array<Object>,
    totalPages: number
|};

class SearchResultRoute extends React.Component<PropsType, StateType> {
    state = {
        isLoading: true,
        loadingPageData: true,
        searchResults: [],
        totalPages: 0
    };

    constructor(props: PropsType) {
        super(props);

        this.input = null;
    }

    componentDidMount() {
        this.fetchSearchResults();
    }

    componentDidUpdate(prevProps: PropsType) {
        if (prevProps.pathName !== this.props.pathName) {
            this.setState({
                isLoading: true,
                loadingPageData: true,
                searchResults: []
            });
            this.fetchSearchResults();
        }
        this.input.getWrappedInstance().resetInputValue();
        this.input.getWrappedInstance().input.blur();
    }

    onPageChange = (object) => {
        console.log('In on page chaange : ', object);
        this.setState({
            isLoading: true,
            loadingPageData: true,
            searchResults: []
        });
        this.fetchSearchResults(object.selected + 1);
    };

    onResultClick = (resultItem: Object) => {
        console.log('In onSearchResult Click : ', resultItem);
        const { openUserInformation } = this.props;
        openUserInformation(resultItem.login);
    };

    getSearchTerm = (): string => {
        const { pathName } = this.props;
        const [, searchTerm] = pathName.replace(/^\/+|\/+$/g, '').split('/');
        return searchTerm;
    };

    fetchSearchResults = (pageId: number = -1): Promise => {
        const searchTerm = this.getSearchTerm();
        return new Promise((resolve) => {
            const url = `https://api.github.com/search/users?q=${searchTerm}${pageId !== -1 ? `&page=${pageId}` : ''}`;
            console.log('CHECKING URL : ', url);
            fetch(url)
                .then((response) => {
                    console.log('Checking Response : ', response);
                    return response.json();
                })
                .then((data) => {
                    console.log('Checking data : ', data);
                    const totalPages = data.total_count > 1000 ? Math.ceil(1000 / 30) : Math.ceil(data.total_count / 30);
                    this.setState({
                        isLoading: false,
                        loadingPageData: false,
                        searchResults: data.items,
                        totalPages
                    });
                    resolve(data);
                });
        });
    };

    renderLoading = () => (
        <div className="loading-in-progress">
            <Spinner name="ball-spin-fade-loader" />
        </div>
    );

    render(): Element<'div'> {
        return (
            <div className="search-result-wrapper">
                <SearchInput ref={input => this.input = input} />
                {
                    this.state.isLoading ?
                        this.renderLoading()
                        :
                        <div>
                            <SearchResultList
                                searchResults={this.state.searchResults}
                                onResultClick={this.onResultClick}
                            />
                            <ReactPaginate
                                previousLabel="previous"
                                nextLabel="next"
                                breakClassName="break-me"
                                pageCount={this.state.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.onPageChange}
                                containerClassName="pagination"
                                subContainerClassName="pages pagination"
                                activeClassName="active"
                            />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    pathName: state.routing.location.pathname
});
const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    openUserInformation: (userName: string) => dispatch(push(`/userInformation/${userName}`))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultRoute);
