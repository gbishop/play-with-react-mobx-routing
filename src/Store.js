import { extendObservable, computed, action, reaction } from 'mobx';
import { fromPromise } from 'mobx-utils';

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

class Store {
  constructor() {
    extendObservable(this, {
      bookid: 0,
      book: null,
      pageno: 1,

      // this needs to be inside the extendObservable, I'm not sure why
      currentPath: computed(() => 
        `/${this.bookid}` + this.pageno > 1 ? `/${this.pageno}` : ''),

    });
    // fetch the book when the id changes
    // figure out when to dispose of this
    this.fetchHandler = reaction(
      () => this.bookid,
      (bookid) => {
        console.log('fetchBook', this.bookid);
        this.book = fromPromise(simpleFetch(`/api/sharedbooks/${this.bookid}.json`))
      });
  }

  setIdPage = action((id, page) => { this.bookid=id; this.pageno=page } );

}

export default Store;
