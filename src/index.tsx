import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Counter from './Counter';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// https://github.com/flatiron/director/issues/349 explains
// why I need the strange path.
import { Router } from 'director/build/director';
import { autorun, useStrict } from 'mobx';
useStrict(true);

interface RouterDecl {
  on(pat: string, func: (value: string) => void);
  configure(config: {});
  init();
}

function startRouter(store: Counter) {

  const baseUrl = process.env.PUBLIC_URL;

  // update state on url change
  let router = new Router() as RouterDecl;
  router.on(baseUrl + '/(\\d+)', (value) => store.setCount(+value));
  router.on(baseUrl + '/', () => store.setCount(0));
  router.configure({
    notfound: () => store.setCount(-1),
    html5history: true
  });
  router.init();

  // update url on state changes
  autorun(() => {
    const path = baseUrl + store.currentPath;
    if (path !== window.location.pathname) {
      console.log('push', path, window.location.pathname);
      window.history.pushState(null, '', path);
    }
  });

}
const store = new Counter();

startRouter(store);

ReactDOM.render(
  <App counter={store} />, 
  document.getElementById('root')
);
registerServiceWorker();
