import * as React from 'react';

type Props = {
  value: string;
  onChanges(e: React.FormEvent<HTMLInputElement>): void;
  submit(): void;
};

const onSubmit = (e: React.FormEvent<HTMLFormElement>, props: Props): void => {
  e.preventDefault();
  props.submit();
};

const SearchForm: React.SFC<Props> = props => (
  <form onSubmit={(e) => onSubmit(e, props)}>
    <input value={props.value} onChange={props.onChanges} type="search" />
    <button type="submit">search</button>
  </form>
);

export default SearchForm;