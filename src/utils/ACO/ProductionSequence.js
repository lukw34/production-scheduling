class ProductionSequence {
  makespan = 50;
  maxSize;

  productionSequence = [];
  
  constructor(maxSize) {
    this.maxSize = maxSize;
  }

  addTask = (task) => {
    this.productionSequence = [...this.productionSequence, task];
  };


  processSequence = callback => this.productionSequence(callback);

  contains = task => this.productionSequence.filter(taskInProduction => taskInProduction.isEqual(task)).length > 0;

  getMakeSpan = () => this.makespan;
  
  isFull = maxSize => this.productionSequence.length
}

export default ProductionSequence;