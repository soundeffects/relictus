import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Scrollbars from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { toggleStatus } from '../actions';
import { flagNames } from '../structure';

class Status extends React.Component {
  handleClick = event => {
    this.props.toggleStatus();
  }
  
  renderSystem() {
    if (this.props.flags.includes(flagNames.RESTARTED)) {
      return <li key='0'>
        <h1>RTerm v0.2</h1>
        <button onClick={this.handleClick}><FontAwesomeIcon icon={faTimes} /></button>
        <hr />
      </li>;
    }
    return null;
  }
  
  renderModule(module, key) {
    return <h3 key={key}>
      {module.name}
    </h3>;
  }
  
  renderBot(bot, key) {
    if (bot.name === 'System')
      return this.renderSystem();
    
    const { name, location, modules } = bot;
    
    return <li key={key}>
      <h2>{name}</h2>
      <h3>At the {location.name.toLowerCase()}</h3>
      { modules.map((module, index) => this.renderModule(module, index))}
      <hr />
    </li>;
  }
  
  render() {
    return <aside className={this.props.open ? '' : 'isClosed'} >
      <Scrollbars style={{ width: '100%', height: '80%' }}>
        <ol>
          { this.props.bots.map((bot, index) => this.renderBot(bot, index)) }
        </ol>
      </Scrollbars>
    </aside>;
  }
}

function mapStateToProps(state) {
  return { bots: state.bots, flags: state.flags, open: state.statusIsOpen };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({ toggleStatus: toggleStatus }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Status);