// @flow

import * as React from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import './searchInput.css';
import type { AppStateType } from '../../rootReducer';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {
    onSearchClicked: (input: string) => void
};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

class SearchInput extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);

        this.resetInputValue = this.resetInputValue.bind(this);
    }
    onKeyUp = (e: Event) => {
        if (e.keyCode === 13) {
            this.onSearchClick();
        }
    };

    onSearchClick = () => {
        const { onSearchClicked } = this.props;
        console.log('This.onSearch Click : ', this.input.value);
        if (this.input.value.trim().length > 0) {
            onSearchClicked(this.input.value.trim());
        }
    };

    resetInputValue() {
        this.input.value = '';
    }

    render(): Element<'div'> {
        return (
            <div className="search-input-wrapper">
                <div className="text-input-wrapper">
                    <input
                        className="text-input col-8 col-sm-8 col-md-8"
                        ref={input => this.input = input}
                        onKeyUp={this.onKeyUp}
                    />
                    <button onClick={() => this.onSearchClick()}>Search</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({});
const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    onSearchClicked: (input: string) => {
        console.log('To dispatch Search');
        dispatch(push(`/search/${input}`));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)(SearchInput);