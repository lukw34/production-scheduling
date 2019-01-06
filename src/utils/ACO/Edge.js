class Edge {
  initialPheromone;

  pheromone;

  src;

  destination;

  time;

  constructor(src, destination, initialPheromone = 1) {
    this.initialPheromone = initialPheromone;
    this.pheromone = initialPheromone;
    this.src = src;
    this.destination = destination;
  }

  getTime = () => this.time;

  getPheromone = () => this.pheromone;

  addPheromone = (extraPheromone) => {
    this.pheromone += extraPheromone;
  };

  getSrcTaskTime = () => this.src.addTaskTime();

  isEqualDestination = destinationToCheck => this.destination.isEqual(destinationToCheck);
}

export default Edge;