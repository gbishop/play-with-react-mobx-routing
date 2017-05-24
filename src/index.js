import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// https://github.com/flatiron/director/issues/349 explains
// why I need the strange path.
import { Router } from 'director/build/director';
import { autorun, useStrict, action } from 'mobx';
useStrict(true);

function startRouter(store) {

    const baseUrl = process.env.PUBLIC_URL;;

    // update state on url change
    let router = new Router();
    router.on(baseUrl + "/(\\d+)", action(value => store.setCount(value)));
    router.on(baseUrl + "/", action(() => store.setCount(0)));
    router.configure({
        notfound: () => store.setCount(-1),
        html5history: true
    });
    router.init();

    // update url on state changes
    autorun(() => {
        const path = store.currentPath.toJSON();
        if (path !== window.location.pathname) {
          window.history.pushState(null, null, path)
        }
    })

}
const store = new Counter();

startRouter(store);

ReactDOM.render(
  <App counter={store} />, 
  document.getElementById('root')
);
registerServiceWorker();
