class Job {
  id;

  time;

  machine;

  makespan = 0;

  constructor(id, time, machine) {
    this.time = time;
    this.id = id;
    this.machine = machine;
  }

  getId = () => this.id;

  getTime = () => this.time;

  setMakespan = (makespan) => {
    this.makespan = makespan;
  };

  resetMakespan = () => {
    this.makespan = 0;
  };

  getMakeSpan = () => this.makespan + this.time;

  isEqual = (candidate) => {
    if (typeof candidate === 'string' || candidate instanceof String) {
      return candidate === this.id;
    }

    if (candidate instanceof RegExp) {
      return this.id.match(candidate);
    }

    return candidate.getId() === this.id;
  }
  
  getMachine = () => this.getId().split(':')[1]
}

export default Job;