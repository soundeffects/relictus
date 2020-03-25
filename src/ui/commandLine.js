import React from 'react';
import './commandLine.css';

class CommandLine extends React.Component {
  constructor(props) {
    super(props);
    this.handleKey = this.handleKey.bind(this);
  }
  
  handleKey(event) {
    if (event.key === 'Enter')
      this.refs.commandLine.value = '';
  }
  
  render() {
    return <input type='text' ref='commandLine' autoFocus='true' onKeyPress={this.handleKey} />;
  }
}

export default CommandLine;