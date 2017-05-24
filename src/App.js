import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import logo from './logo.svg';
import './App.css';

class Link extends Component {
  handleClick = (e) => {
    console.log(e);
    console.log('history', window.history);
    e.preventDefault();
    window.history.pushState(null, null, this.props.href);
  }
  render() {
    return (
      <a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>
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
        <p><Link href="/1000">Go to 1000</Link></p>
        <DevTools />
      </div>
    );
  }
}

export default observer(App);
