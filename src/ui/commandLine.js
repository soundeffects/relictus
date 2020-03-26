import React, { createRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userInput, gameResponse } from '../actions';

class CommandLine extends React.Component {
  commandLine = createRef();
  
  handleKey = (event) => {
    if (event.key === 'Enter') {
      const commandLine = this.commandLine.current;
      
      if (commandLine.value !== '') {
        const { input, respond, time }  = this.props;
        
        input(time, commandLine.value, true);
        commandLine.value = '';
        respond(time);
      }
    }
  }
  
  render() {
    return <input type='text' ref={this.commandLine} autoFocus onKeyPress={this.handleKey} />;
  }
}

function matchStateToProps(state) {
  return { time: state.time };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(
    { input: userInput, respond: gameResponse },
    dispatch
  );
}

export default connect(matchStateToProps, matchDispatchToProps)(CommandLine);