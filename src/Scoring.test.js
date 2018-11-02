import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import Game from './Game'
import Scoring from './Scoring'

// we can't test child without rendering parent, tested with mount in Game
// it('it renders shallowly without crashing', () => {
//   let wrapper = shallow(<Scoring />)
// })



it('it saves the score when a rule is clicked', () => {
  let board = mount(<Game />)
  let rollBtn = board.find('button').first();
  rollBtn.simulate("click");
  let updateScoreBtn = board.find('Rule').first();
  updateScoreBtn.simulate('click');
  expect(board.state().scores.get('ones')).toEqual(expect.any(Number))
})