import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import './App.css';

class App extends Component {
  render() {
    const {store} = this.props;
    if (store.book.state === 'pending') {
      return <h1>Loading</h1>;
    } else if (store.book.state === 'rejected') {
      return <Error error={store.book.value} />
    } else {
      return (
        <div className="App">
          <p className="App-intro">
            {store.book.value.title} {store.pageno}
          </p>
          <DevTools />
        </div>
      );
    }
  }
}

const Error = ({ error }) => {
  console.log('Error', error, typeof(error));
  if ('status' in error) {
    return <h1>{"Error: " + error.status + '/' + error.statusText}</h1>;
  } else {
    return <h1>{error}</h1>
  }
}

export default observer(App);
