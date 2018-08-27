// @flow

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export type RoutingReducerType = {|
    location: {|
        pathname: string,
        search: string,
        hash: string
    |}
|};
export type AppStateType = {|
    routing: RoutingReducerType
|};

const appState: AppStateType = {
    routing: routerReducer,
};

export default combineReducers(appState);
