import React from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';

class Log extends React.Component {
  render() {
    const list = this.props.log.map(
      (message, index) =>
        <li key={index} className={message.userInput ? 'user' : ''}>
          <div className='time'>{message.time}</div>
          <p>{message.text}</p>
        </li>
    );
    
    return <main>
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        <ul>{list}</ul>
      </Scrollbars>
    </main>;
  }
}

function mapStateToProps(state) {
  return { log: state.log };
}

export default connect(mapStateToProps)(Log);