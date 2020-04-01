import React, { createRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import { userInput, gameResponse, toggleStatus } from '../actions';
import { flagNames } from '../structure';

class CommandLine extends React.Component {
  commandLine = createRef();
  inputIndex = -1;
  
  cycleInputs() {
    if (this.inputIndex === -1)
      this.setText('');
    else
      this.setText(this.props.inputs[this.inputIndex]);
  }
  
  setText(value) {
    this.commandLine.current.value = value;
  }
  
  handleArrows = event => {
    if (event.key === 'ArrowUp' && this.inputIndex < this.props.inputs.length - 1) {
      this.inputIndex++;
      this.cycleInputs();
    }
    if (event.key === 'ArrowDown' && this.inputIndex > -1) {
      this.inputIndex--;
      this.cycleInputs();
    }
  }
  
  handleEnter = event => {
    if (event.key === 'Enter') {
      const input = this.commandLine.current.value;
      
      if (input !== '') {
        const { sendInput, respond, bots, flags }  = this.props;
        
        sendInput(input);
        this.setText('');
        respond(input, bots, flags);
      }
    }
  }
  
  handleClick = event => {
    this.props.toggleStatus();
  }
  
  render() {
    const { statusOpen, flags } = this.props;
    
    return <footer className={statusOpen ? 'isClosed' : ''}>
      <input type='text' ref={this.commandLine} autoFocus onKeyPress={this.handleEnter} onKeyDown={this.handleArrows} />
      <button className={flags.includes(flagNames.RESTARTED) ? '' : 'isClosed'} onClick={this.handleClick}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
    </footer>;
  }
}

function matchStateToProps(state) {
  return { bots: state.bots, flags: state.flags, statusOpen: state.statusIsOpen, inputs: state.inputs };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(
    { sendInput: userInput, respond: gameResponse, toggleStatus: toggleStatus },
    dispatch
  );
}

export default connect(matchStateToProps, matchDispatchToProps)(CommandLine);