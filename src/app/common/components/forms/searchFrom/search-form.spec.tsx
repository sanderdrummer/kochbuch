import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SearchForm from './search-form';

it('should render search form', () => {
    const wrapper = shallow((
    <SearchForm
        label="test"
        placeholder=""
        reducerName="searchUi"
        state="product"
        value="test"
        // tslint:disable-next-line:no-empty
        onSubmit={(e) => {}}
        // tslint:disable-next-line:no-empty
        resetValue={() => {}}
        // tslint:disable-next-line:no-empty
        onChanges={(e) => {}}
    />
        )
    );
    expect(toJson(wrapper)).toMatchSnapshot();    
});