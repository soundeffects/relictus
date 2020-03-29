import React from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';

class Log extends React.Component {
  renderList() {
    return this.props.log.map(
      (message, index) =>
        <li key={index} className={message.style}>
          <div className='time'>{message.time}</div>
          <p>{message.text}</p>
        </li>
    );
  }
  
  render() {
    return <main>
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        <ul>{this.renderList()}</ul>
      </Scrollbars>
    </main>;
  }
}

function mapStateToProps(state) {
  return { log: state.log };
}

export default connect(mapStateToProps)(Log);