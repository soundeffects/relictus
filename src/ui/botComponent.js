import React from 'react';

export default function BotComponent(props) {
  const { bot } = this.props;
  
  return <section>
    <h4>{bot.name}</h4>
    <h5>{bot.process}</h5>
    <h5>{bot.modules}</h5>
    <hr />
  </section>;
}