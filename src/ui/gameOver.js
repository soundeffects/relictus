import React from 'react';
import { connect } from 'react-redux';

import { flagNames } from '../structure';

class GameOver extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message: ''
    };
    
    this.isGameOver().bind(this);
  }
  
  isGameOver() {
    const { flags } = this.props;
    
    if (flags.includes(flagNames.DEATH_BY_EXIT)) {
      this.setState({ message: 'You never woke up again. The ship fell into the atmosphere of some planet and you burned up in the process.' });
      return true;
    }
    
    return false;
  }
  
  render() {
    return <div className={"popup " + this.isGameOver() ? 'doDisplay' : ''}>
      <h1>Game Over</h1>
      <p>{ this.state.message }</p>
      <p>Your score was: { this.props.score }</p>
      <p>Restart?</p>
    </div>;
  }
}

function mapStateToProps(state) {
  return { flags: state.flags, score: state.score };
}

export default connect(mapStateToProps)(GameOver);