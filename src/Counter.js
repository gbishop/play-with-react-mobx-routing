import { extendObservable, computed, action } from 'mobx';

class Counter {
  constructor() {
    extendObservable(this, {
      count: 0,
      isOdd: computed(() => this.count % 2 === 1),
      currentPath: computed(() => `/${this.count}`),
      setCount: action((i) => this.count = i)
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

}

export default Counter;
