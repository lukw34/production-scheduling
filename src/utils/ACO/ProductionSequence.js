class ProductionSequence {
  makespan = 0;

  maxSize;

  productionSequence = [];

  isFinish = false;

  constructor(maxSize) {
    this.maxSize = maxSize;
  }

  addTask = (task) => {
    if (task.getId() === 'finish') {
      this.isFinish = true;
    }

    this.makespan = task.addTaskTime(this.makespan);
    this.productionSequence = [...this.productionSequence, task];
  };


  processSequence = callback => this.productionSequence.forEach(callback);

  contains = task => this.productionSequence.filter(taskInProduction => taskInProduction.isEqual(task)).length > 0;

  getMakeSpan = () => this.makespan;

  isFull = () => this.isFinish || this.productionSequence.length >= this.maxSize;

  print = () => {
    // console.log(this.productionSequence.reduce((prev, act) => `${prev}; ${act.getId()}`), '');
    // console.log(`Makespan: ${this.makespan}`);
  }
}

export default ProductionSequence;