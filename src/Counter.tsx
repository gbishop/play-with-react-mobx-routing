import { observable, computed, action } from 'mobx';

class Counter {
  @observable count: number = 0;

  @computed
  get currentPath() { return `/${this.count}`; }

  @computed
  get isOdd() { return this.count % 2 === 1; }

  @action.bound increment() { this.count++; }

  @action.bound decrement() { this.count--; }

  @action.bound setCount(i: number) { this.count = i; }
}
 
export default Counter;
