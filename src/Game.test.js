import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Game from './Game'

it('it renders shallowly without crashing', () => {
  let wrapper = shallow(<Game />)
})

it('it renders with children without crashing', () => {
  let wrapper = mount(<Game />)
})