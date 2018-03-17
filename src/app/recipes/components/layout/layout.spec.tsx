import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Layout from './layout'; 

it('should render layout', () => {
    const wrapper = shallow(<Layout />);
    expect(toJson(wrapper)).toMatchSnapshot();
});