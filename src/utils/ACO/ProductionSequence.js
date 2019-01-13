class ProductionSequence {
  makespan = 0;

  maxSize;

  productionSequence = [];

  makespanCount = [];

  constructor(maxSize) {
    this.maxSize = maxSize;
  }

  addTask = (task) => {
    const taskMakespan = task.getMakespan();
    if (taskMakespan > this.makespan) {
      this.makespanCount.push(taskMakespan);
      this.makespan = taskMakespan;
    }

    this.productionSequence = [...this.productionSequence, task];
  };

  processSequence = (callback, method = 'forEach') => this.productionSequence[method](callback);

  contains = task => this.productionSequence.filter(taskInProduction => taskInProduction.isEqual(task)).length > 0;

  getMakeSpan = () => this.makespan;

  isFull = () => this.productionSequence.length >= this.maxSize;

  print = () => {
    // console.log(this.productionSequence.reduce((prev, act) => `${prev}; ${act.getId()}`), '');
    // console.log(`Makespan: ${this.makespan}`);
  }
}

export default ProductionSequence;