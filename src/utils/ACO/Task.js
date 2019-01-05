class Task {
  id;

  time;

  constructor(id, time) {
    this.time = time;
    this.id = id;
  }

  getId = () => this.id;

  addTaskTime = (previousTime = 0) => previousTime + this.time;

  isEqual = candidate => candidate.getId() === this.id;
}

export default Task;