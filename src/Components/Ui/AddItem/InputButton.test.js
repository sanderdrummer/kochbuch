import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputButton from './InputButton';
import React from 'react';
import toJson from 'enzyme-to-json';

configure({
    adapter: new Adapter()
});

describe('InputButton tests', () => {

    let wrapper;
    let triggerOnClick;

    beforeEach(() => {

        triggerOnClick = jest.fn();
        wrapper = shallow(<InputButton triggerOnClick={triggerOnClick}/>);
    });

    afterEach(() => {
        triggerOnClick.mockReset();    
    });

    it('should render an input and a button' , () => {

        expect(wrapper.find('button.button.is-primary').length).toBeTruthy();
        expect(wrapper.find('input.input').length).toBeTruthy();        
    });

    it('should be submitted on click', () => {
        const button = wrapper.find('button.button');
        button.simulate('click');

        expect(triggerOnClick.mock.calls.length).toEqual(1);
    });

    it('should render correctly', () => {

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});