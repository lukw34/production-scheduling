class TabuList {
  size = 0;

  list = [];

  constructor(size) {
    this.size = size;
  }

  addItem = (element) => {
    this.list = [element, ...this.list];
    if (this.list.length > this.size) {
      this.list = [...this.list.slice(0, -1)];
    }
  };

  contain = element => this.list.filter(tabuElement => element.isEqual(tabuElement)).length > 0;
}

export default TabuList;