Array.prototype.lastElement = function () {
  return this[this.length - 1];
};

Array.prototype.firstElement = function () {
  return this[0];
};

class Problem {
  machineJobs = [];

  allJobs = [];

  jobSequence = {};

  graph = null;

  addMachineJobs = (jobs) => {
    this.machineJobs = [...this.machineJobs, jobs];
  };

  setJobs = (jobs) => {
    this.allJobs = jobs;
  };

  addJobSequence = (jobId, jobs) => {
    this.jobSequence = {
      ...this.jobSequence,
      [jobId]: jobs
    };
  };

  setGraph = (graph) => {
    this.graph = graph;
  };

  getGraph = () => this.graph;

  getGraphCopy = () => this.graph.copy();

  getJobs = () => this.graph.getNodes();

  getFirstAndLastFromEachJobSequence = () => Object.keys(this.jobSequence)
    .map(key => this.jobSequence[key])
    .reduce(({ first, last }, sequence) => {
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

  getSuccessor = (job) => {
    const [jobId, , index] = job.split(':');
    return this.jobSequence[jobId][Number(index) + 1] || null;
  };

  getJob = jobId => this.allJobs[jobId];
}

export default Problem;