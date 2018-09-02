// @flow

import * as React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

import type { AppStateType } from '../../rootReducer';
import SearchInput from '../../components/seachInput/SearchInput';

import './userInformationRoute.css';

type MappedStatePropsType = {|
    pathName: string
|};
type MappedDispatchPropsType = {};
type OwnPropsType = {};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;
type StateType = {|
    isLoading: boolean,
    user: ?Object,
    repos: ?Object,
    followers: ?Object,
    following: ?Object
|};

class UserInformationRoute extends React.Component<PropsType, StateType> {
    state = {
        isLoading: true,
        user: null,
        repos: null,
        followers: null,
        following: null
    };

    constructor(props: PropsType) {
        super(props);

        this.input = null;
    }

    componentDidMount() {
        this.fetchUser()
            .then(() => this.fetchFollowing())
            .then(() => this.fetchFollowers())
            .then(() => this.fetchRepos())
            .then(() => {
                console.log('Finish Feteching all data');
                this.setState({
                    isLoading: false
                });
            });
    }

    getSearchTerm = (): string => {
        const { pathName } = this.props;
        const [, searchTerm] = pathName.replace(/^\/+|\/+$/g, '').split('/');
        return searchTerm;
    };

    fetchFollowing = () => {
        const { user } = this.state;

        if (!user) return Promise.resolve();

        return new Promise((resolve) => {
            fetch(`https://api.github.com/users/${user.login}/following`)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        following: {
                            name: 'Following',
                            data: data.map(following => following.login)
                        }
                    });
                    resolve(data);
                });
        });
    };

    fetchFollowers = () => {
        const { user } = this.state;

        if (!user) return Promise.resolve();

        return new Promise((resolve) => {
            fetch(user.followers_url)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        followers: {
                            name: 'Followers',
                            data: data.map(follower => follower.login)
                        }
                    });
                    resolve(data);
                });
        });
    };

    fetchRepos = () => {
        const { user } = this.state;

        if (!user) return Promise.resolve();

        return new Promise((resolve) => {
            fetch(user.repos_url)
                .then(response => response.json())
                .then((data) => {
                    this.setState({
                        repos: {
                            name: 'Repos',
                            data: data.map(repo => repo.name)
                        }
                    });
                    resolve(data);
                });
        });
    };

    fetchUser = () => {
        const searchTerm = this.getSearchTerm();
        const url = `https://api.github.com/search/users?q=${searchTerm}`;
        return new Promise((resolve) => {
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    const userInformation = data.items.filter(user => user.login === searchTerm);
                    this.setState({
                        user: userInformation[0]
                    });
                    resolve(userInformation);
                });
        });
    };

    renderJsonResult = () => {
        const { user } = this.state;

        if (!user) return null;

        const result = JSON.stringify(user, null, 4);
        return (
            <div className="user-result-wrapper">
                <h1 className="user-result-information-header">User Results</h1>
                <pre>{result}</pre>
            </div>
        );
    }

    renderUserDetails = () => {
        const {
            user, repos, followers, following
        } = this.state;

        if (!user) return null;

        return (
            <div className="user-information-wrapper">
                {this.renderResultTable(repos)}
                {this.renderResultTable(followers)}
                {this.renderResultTable(following)}
                {this.renderJsonResult()}
            </div>

        );
    };

    renderResultTable = (data) => {
        if (data && data.data && data.data.length > 0) {
            return (
                <div className="user-information-result-table-wrapper">
                    <h1 className="user-information-header">{data.name}</h1>
                    <table className="user-information-result-table">
                        <thead className="table-header-wrapper">
                            <tr className="table-row">
                                <th className="index">#</th>
                                <th className="username">Name</th>
                            </tr>
                        </thead>
                        <tbody className="table-body-wrapper">
                            {
                                data.data.map((value, index) => (
                                    <tr className="table-row" key={index}>
                                        <td className="index">{index + 1}</td>
                                        <td className="username">{value}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
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
                        this.renderUserDetails()
                }
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    pathName: state.routing.location.pathname
});
const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInformationRoute);
