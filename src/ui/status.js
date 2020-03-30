import React from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';

class Status extends React.Component {
  renderModule(module, key) {
    return <h3 key={key}>
      {module.name}
    </h3>;
  }
  
  renderBot(bot, key) {
    if (bot.name === 'system') {
      if (this.props.stage !== 'needs reboot')
        return [<h1 key={key + '.1'}>RTerm v0.1</h1>, <hr key={key + '.2'} />];
      return null;
    }
    
    const { name, location, modules } = bot;
    
    return <li key={key}>
      <h2>{name}</h2>
      <h3>At the {location.name.toLowerCase()}</h3>
      { modules.map((module, index) => this.renderModule(module, index))}
      <hr />
    </li>;
  }
  
  render() {
    return <aside>
      <Scrollbars style={{ width: '100%', height: '80%' }}>
        <ol>
          { this.props.bots.map((bot, index) => this.renderBot(bot, index)) }
        </ol>
      </Scrollbars>
    </aside>;
  }
}

function mapStateToProps(state) {
  return { bots: state.bots, stage: state.stage };
}

export default connect(mapStateToProps)(Status);