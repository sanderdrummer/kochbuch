import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Notification from './Notification';

configure({
    adapter: new Adapter()
});

describe('Notification', () =>{

    let wrapper;

    beforeEach(() =>{
        wrapper = shallow(<Notification/>);
    });

    it('should render null on default', () =>{
        expect(wrapper.find('article').exists()).toEqual(false);
    });
    it('should render a message', () =>{
        wrapper.setProps({
            message: 'a message'
        });
        expect(wrapper.find('.message-body').contains('a message')).toEqual(true);
    });

    it('should set a type class on article', () =>{
        wrapper.setProps({
            type: 'is-primary',
            message: 'a message'
        });
        expect(wrapper.find('article.is-primary').exists()).toEqual(true);
    });
});