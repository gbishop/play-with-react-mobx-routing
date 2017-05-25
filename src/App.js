import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import logo from './logo.svg';
import './App.css';

// Try a hack Link component. I'm not convinced this is the right way.
// Maybe they just explicitly use onClick to update the state? 
// What should the href be? The aly checker doesn't like #. Ideally, I
// think it would be the value of currentPath after the update. How to
// generate that?
class Link extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.action(this.props.value);
  }
  render() {
    return (
      <a href={'/'+this.props.value} onClick={this.handleClick}>{this.props.children}</a>
    ) }
}

class App extends Component {
  render() {
    const {counter} = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React + mobx</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Counter:
          <span className={counter.isOdd ? 'Counter-odd' : 'Counter-even'}> {counter.count} </span>
        </p>
        <p>
          <button onClick={() => counter.increment()}> + </button>
          <button onClick={() => counter.decrement()}> - </button>
        </p>
        <p>
          <button onClick={() => counter.fetchCount('/api/count.json')}>
          fetch
          </button>
        </p>
        <p><Link action={counter.setCount} value="1000">Go to 1000</Link></p>
        <DevTools />
      </div>
    );
  }
}

export default observer(App);
