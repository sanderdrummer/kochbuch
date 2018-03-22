import * as React from 'react';

import { Props } from './search-form.container';
import { buttonStyle, inputStyle, Shadows } from '../../..';
import { classes, style } from 'typestyle/lib';

const formStyle = style({
  display: 'flex',
  boxShadow: Shadows.level3,
  margin: '1rem',
});

const onSubmit = (e: React.FormEvent<HTMLFormElement>, props: Props): void => {
  e.preventDefault();
  props.onSubmit(props.value);
  props.resetValue();
};

const SearchForm: React.SFC<Props> = props => (
  <form className={formStyle} onSubmit={(e) => onSubmit(e, props)}>
    <input 
      className={classes(inputStyle, 'grow')}
      autoFocus={true} 
      value={props.value} 
      placeholder={props.placeholder || ''}  
      onChange={props.onChanges} 
      type="search" 
    />
    <button className={buttonStyle} type="submit">{props.label}</button>
  </form>
);

export default SearchForm;