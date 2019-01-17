class Operation {
  duration = 0;

  job = null;

  machine = null;

  id = null;

  previousOperation = null;

  nextOperation = null;

  constructor(duration, job, machine, id, previousOperation) {
    this.duration = duration;
    this.job = job;
    this.machine = machine;
    this.id = id;
    this.previousOperation = previousOperation;
  }


  setNextOperation = (operation) => {
    this.nextOperation = operation;
  };

  getDuration = () => this.duration;

  getJob = () => this.job;

  getMachine = () => this.machine;

  isEqual = operation => (operation.getDuration() === this.duration)
    && (operation.getJob().isEqual(this.job))
    && (operation.getMachine() === this.machine)
}

export default Operation;