import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NamedListSelector from './NamedListSelector';
import React from 'react';

configure({
    adapter: new Adapter()
});

describe('NamedListSelector', () =>{

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NamedListSelector/>);
    }) ;

    it('should render an empty nav panel on default', () =>{
        expect(wrapper.find('nav.panel')).toHaveLength(1);
    });

    it('should render a header', () =>{
        wrapper.setProps({
            headerLabel: 'the header'
        });
        expect(wrapper.find('p.panel-heading').contains('the header')).toEqual(true);
    });

    it('should render items', () =>{
        wrapper.setProps({
            items: [{name: 'item1'},{name: 'item2'}]
        });
        expect(wrapper.find('a.panel-block').contains('item1')).toEqual(true);
        expect(wrapper.find('a.panel-block')).toHaveLength(2);
    });


});