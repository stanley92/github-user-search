// @flow

import * as React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';

import type { AppStateType } from '../../rootReducer';
import SearchInput from '../../components/seachInput/SearchInput';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {};
type OwnPropsType = {};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;
type StateType = {||};

class HomeRoute extends React.Component<PropsType, StateType> {
    componentDidMount() {
        fetch('https://api.github.com/search/users?q=stanley92')
            .then(response => response.json())
            .then((data) => {
                console.log('Checking Data : ', data);
            });
    }

    render(): Element<'div'> {
        return (
            <div className="row">
                <SearchInput />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({});
const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeRoute);
