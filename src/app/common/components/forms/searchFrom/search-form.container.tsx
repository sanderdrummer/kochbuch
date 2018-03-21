import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../../store/state';
import { uiActions } from '../../..';
import SearchForm from './search-form';

interface DispatchProps {
  onChanges(e: React.FormEvent<HTMLInputElement>): void;
  resetValue(): void;
}

interface StateProps {
  value: string;
}

interface OwnProps {
  reducerName: string;
  state: string;
  label: string;
  placeholder: string;
  onSubmit(title: string): void;
}

export interface Props extends DispatchProps, StateProps, OwnProps {
}

const mapStateToProps = (state: AppState, props: OwnProps): StateProps => ({
  value: state[props.state].ui.query
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>, props: OwnProps): DispatchProps => ({
  onChanges: (e: React.FormEvent<HTMLInputElement>) => 
    dispatch(uiActions.updateQuery(props.reducerName, e.currentTarget.value)),
  resetValue: () => dispatch(uiActions.updateQuery(props.reducerName, ''))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);