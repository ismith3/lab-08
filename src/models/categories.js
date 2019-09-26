class Categories {
  constructor() {
    this.data = {};
  }

  get(id) {
    return Promise.resolve(
      id
        ? this.data[id]
        : Object.keys(this.data).reduce((arr, element) => {arr.push(this.data[element]); return arr;}, [])
    );
  }
}

module.exports = Categories;