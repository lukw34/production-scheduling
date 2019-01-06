class Task {
  id;

  time;

  machine;

  constructor(id, time, machine) {
    this.time = time;
    this.id = id;
    this.machine = machine;
  }

  getId = () => this.id;

  addTaskTime = (previousTime = 0) => previousTime + this.time;

  isEqual = candidate => candidate === this.id;
}

export default Task;