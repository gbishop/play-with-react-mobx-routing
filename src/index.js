import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
// https://github.com/flatiron/director/issues/349 explains
// why I need the strange path.
import { Router } from 'director/build/director';
import { autorun } from 'mobx';

function startRouter(store) {

    // update state on url change
    let router = new Router({
        "/:value": (value) => store.setCount(value),
        "/": () => store.setCount(0)
    });
    router.configure({
        notfound: () => store.setCount(-1),
        html5history: true
    });
    router.init();

    // update url on state changes
    autorun(() => {
        const path = store.currentPath
        if (path !== window.location.pathname)
                window.history.pushState(null, null, path)
    })

}
const store = new Counter();

startRouter(store);

ReactDOM.render(
  <App counter={store} />, 
  document.getElementById('root')
);
registerServiceWorker();
