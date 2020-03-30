import React, { createRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userInput, gameResponse } from '../actions';

class CommandLine extends React.Component {
  commandLine = createRef();
  
  handleKey = (event) => {
    if (event.key === 'Enter') {
      const input = this.commandLine.current.value;
      
      if (input !== '') {
        const { sendInput, respond, bots, stage }  = this.props;
        
        sendInput(input);
        this.commandLine.current.value = '';
        respond(input, bots, stage);
      }
    }
  }
  
  render() {
    return <input type='text' ref={this.commandLine} autoFocus onKeyPress={this.handleKey} />;
  }
}

function matchStateToProps(state) {
  return { bots: state.bots, stage: state.stage };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators(
    { sendInput: userInput, respond: gameResponse },
    dispatch
  );
}

export default connect(matchStateToProps, matchDispatchToProps)(CommandLine);