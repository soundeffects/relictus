import React, { createRef } from 'react';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';

class Log extends React.Component {
  end = createRef();
  
  scrollToBottom = () => {
    this.end.current.scrollIntoView({ behavior: "smooth" });
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }
  
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
    return <main className={this.props.statusOpen ? 'isClosed' : ''}>
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        <ul>
          <div className='spacer'></div>
          {this.renderList()}
           <div className='spacer'></div>
          <div style={{ float:"left", clear: "both" }} ref={this.end}></div>
        </ul>
      </Scrollbars>
    </main>;
  }
}

function mapStateToProps(state) {
  return { log: state.log, statusOpen: state.statusIsOpen };
}

export default connect(mapStateToProps)(Log);