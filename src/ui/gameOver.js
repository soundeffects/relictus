import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { gameOverRestart } from '../actions';
import { flagNames } from '../structure';

class GameOver extends React.Component {
  isGameOver = () => {
    const { flags } = this.props;
    
    if (flags.includes(flagNames.DEATH_BY_EXIT)) {
      if (!this.state)
        this.setState({ 
          message: 'You never woke up again. The ship fell into the atmosphere of some planet and you burned up in the process.',
          style: 'error'
        });
      return true;
    }
    
    return false;
  }
  
  handleClick = event => {
    this.props.restart();
    this.setState(null);
  }
  
  render() {
    return <div className={"popup" + (this.isGameOver() ? " doDisplay" : "")}>
      <h1>Game Over</h1>
      { this.state ? <p className={ this.state.style }>{ this.state.message }</p> : null }
      <p>Your score was: { this.props.score }</p>
      <button onClick={ this.handleClick }>Restart?</button>
    </div>;
  }
}

function mapStateToProps(state) {
  return { flags: state.flags, score: state.score };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { restart: gameOverRestart },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(GameOver);