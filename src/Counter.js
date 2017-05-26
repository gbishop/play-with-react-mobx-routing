import { extendObservable, computed, action } from 'mobx';

function simpleFetch(url) {
    return new Promise((resolve, reject) => {
        window.fetch(url)
            .then(res => {
                if (res.ok) {
                    res.json().then(resolve).catch(reject)
                } else {
                    reject(res)
                }
            })
            .catch(reject)
    });
}

class Counter {
  constructor() {
    extendObservable(this, {
      count: 0,

      currentPath: computed(() => `/${this.count}`),

      isOdd: computed(() => this.count % 2 === 1)
    });
  }

  increment = action(() => this.count++);

  decrement = action(() => this.count--);

  setCount = action((i) => this.count = +i);

  fetchCount = (path => {
    simpleFetch(path)
      .then(action(data => {
        this.count = data.value;
      }))
      .catch(err => {
        console.log('error', err);
      });
  });
}

export default Counter;
