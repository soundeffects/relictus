import React from 'react';
import BotComponent from './botComponent';

export default class Status extends React.Component {
  render() {
    return <aside>
      <h1>RelictusOS</h1>
      <h2>v0.1 Condor</h2>
      <hr />
      
      <BotComponent />
    </aside>;
  }
}