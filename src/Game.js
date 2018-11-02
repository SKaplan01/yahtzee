import React, { Component } from 'react';
import Dice from './Dice';
import Scoring from './Scoring';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      // scores: {
      //   ones: undefined,
      //   twos: undefined,
      //   threes: undefined,
      //   fours: undefined,
      //   fives: undefined,
      //   sixes: undefined,
      //   threeOfKind: undefined,
      //   fourOfKind: undefined,
      //   fullHouse: undefined,
      //   smallStraight: undefined,
      //   largeStraight: undefined,
      //   yahtzee: undefined,
      //   chance: undefined
      // }
      scores: new Map()
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
  }

  // don't roll die that have been clicked on/locked 
  roll(evt) {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => st.locked[i] ? d : Math.ceil(Math.random() * 6)),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
    }));
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ],
      }))
    }
  }

  // Rule component calls do score and passes rulename and ruleFn from props
  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    // if (!this.state.scores[rulename]) {
    //   this.setState(st => ({
    //     scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
    //     rollsLeft: NUM_ROLLS,
    //     locked: Array(NUM_DICE).fill(false),
    //   }));
    //   //after storing score, reset state so rollsLeft is 3 and dice are blank
    //   // this.roll();
    //   this.setState({ rollsLeft: 3, dice: Array.from({ length: NUM_DICE }) })

    if (!this.state.scores.has(rulename)) {
      console.log(rulename, ruleFn(this.state.dice));
      this.setState(st => ({
        scores: this.state.scores.set(rulename, ruleFn(this.state.dice)),
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
      }));

      console.log(this.state.scores);
      //after storing score, reset state so rollsLeft is 3 and dice are blank
      // this.roll();
      this.setState({ rollsLeft: 3, dice: Array.from({ length: NUM_DICE }) })
    }
  }

  render() {
    return (
      <section>
        <Dice dice={this.state.dice} locked={this.state.locked} handleClick={this.toggleLocked} />
        <button
          className="Game-reroll"
          disabled={this.state.locked.every(x => x)}
          onClick={this.roll}>
          {this.state.rollsLeft} Rerolls Left
        </button>
        <Scoring doScore={this.doScore} scores={this.state.scores} />
      </section >
    );
  }
}

export default Game;