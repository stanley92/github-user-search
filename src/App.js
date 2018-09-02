// @flow

import * as React from 'react';
import type { Element, } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RouteWithProps from './routeComponents/RouteWIthProps';
import HomeRoute from './routeComponents/HomeRoute';
import SearchRoute from './routeComponents/SearchResultRoute';
import UserInformationRoute from './routeComponents/UserInformationRoute';

import './App.css';

import type { AppStateType } from './rootReducer';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {||};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

class App extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: PropsType) {

    }

    render(): Element<'div'> {
        return (
            <div className="App">
                <main>
                    <RouteWithProps
                        exact
                        path="/"
                        component={HomeRoute}
                    />
                    <RouteWithProps
                        path="/search/:user"
                        component={SearchRoute}
                    />
                    <RouteWithProps
                        path="/userInformation/:username"
                        component={UserInformationRoute}
                    />
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
