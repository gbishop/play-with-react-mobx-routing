import { extendObservable, computed, action } from 'mobx';

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

}

export default Counter;
