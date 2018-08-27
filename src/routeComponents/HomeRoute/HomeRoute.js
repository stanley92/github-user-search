// @flow

import * as React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';

import type { AppStateType } from '../../rootReducer';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {};
type OwnPropsType = {};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;
type StateType = {||};

class HomeRoute extends React.Component<PropsType, StateType> {
    render(): Element<'div'> {
        return (
            <div>Home</div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({});
const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeRoute);
