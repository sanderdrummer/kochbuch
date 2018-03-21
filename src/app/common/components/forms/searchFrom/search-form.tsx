import * as React from 'react';

import { Props } from './search-form.container';

const onSubmit = (e: React.FormEvent<HTMLFormElement>, props: Props): void => {
  e.preventDefault();
  props.onSubmit(props.value);
  props.resetValue();
};

const SearchForm: React.SFC<Props> = props => (
  <form onSubmit={(e) => onSubmit(e, props)}>
    <input 
      autoFocus={true} 
      value={props.value} 
      placeholder={props.placeholder || ''}  
      onChange={props.onChanges} 
      type="search" 
    />
    <button type="submit">{props.label}</button>
  </form>
);

export default SearchForm;