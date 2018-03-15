import * as React from 'react';

import { Props } from './search-form.container';

const onSubmit = (e: React.FormEvent<HTMLFormElement>, props: Props): void => {
  e.preventDefault();
  props.onSubmit(props.value);
  props.resetValue();
};

const SearchForm: React.SFC<Props> = props => (
  <form onSubmit={(e) => onSubmit(e, props)}>
    <input value={props.value} onChange={props.onChanges} type="search" />
    <button type="submit">search</button>
  </form>
);

export default SearchForm;