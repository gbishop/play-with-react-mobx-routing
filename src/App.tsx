import * as React from 'react';
import { observer } from 'mobx-react';
import './App.css';
import Counter from './Counter';

const logo = require('./logo.svg');

interface ValueType {
  value: number;
}

function simpleFetch(url: string): Promise<ValueType> {
    return new Promise((resolve, reject) => {
        window.fetch(url)
            .then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject);
                } else {
                    reject(res);
                }
            })
            .catch(reject);
    });
}

interface AppProps {
  counter: Counter;
}

@observer
class App extends React.Component<AppProps, void> {
  fetchCount(path: string) {
    simpleFetch(path)
      .then((data) => {
        console.log('data', data);
        this.props.counter.setCount(data.value);
      })
      .catch(err => {
        console.log('error', err);
      });
  }
  render() {
    const {counter} = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React + mobx + routing</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Counter:
          <span className={counter.isOdd ? 'Counter-odd' : 'Counter-even'}> {counter.count} </span>
        </p>
        <p>
          <button onClick={counter.increment}> + </button>
          <button onClick={() => counter.decrement()}> - </button>
        </p>
        <p>
          <button onClick={() => this.fetchCount('/api/count.json')}>
          fetch
          </button>
        </p>
      </div>
    );
  }
}

export default App;
