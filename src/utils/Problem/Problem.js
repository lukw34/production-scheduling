Array.prototype.lastElement = function () {
  return this[this.length - 1];
};

Array.prototype.firstElement = function () {
  return this[0];
};

class Problem {
  machineJobs = [];

  allJobs = [];

  jobSequence = [];

  graph = null;

  addMachineJobs = (jobs) => {
    this.machineJobs = [...this.machineJobs, jobs];
  };

  addJobs = (jobs) => {
    this.allJobs = [...this.allJobs, ...jobs];
  };

  addJobSequence = (jobs) => {
    this.jobSequence = [...this.jobSequence, jobs];
  };

  setGraph = (graph) => {
    this.graph = graph;
  };

  getGraph = () => this.graph;

  getJobs = () => this.allJobs;

  getFirstAndLastFromEachJobSequence = () => this.jobSequence.reduce(({ first, last }, sequence) => {
    first.set(sequence.firstElement().getId(), 0);
    last.set(sequence.lastElement().getId(), 0);
    return {
      first,
      last
    };
  }, {
    last: new Map(),
    first: new Map()
  });

  getNumberOfOperations = () => this.getGraph().getNodes().length;
}

export default Problem;