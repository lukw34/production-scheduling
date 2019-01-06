class Edge {
  initialPheromone;

  pheromone;

  src;

  destination;

  constructor(src, destination, initialPheromone = 0.4) {
    this.initialPheromone = initialPheromone;
    this.pheromone = initialPheromone;
    this.src = src;
    this.destination = destination;
  }

  getDestinationTask = () => this.destination;

  getPheromone = () => this.pheromone;

  addPheromone = (modifyPheromone) => {
    this.pheromone = modifyPheromone(this.pheromone);
  };

  getSrcTaskTime = () => this.src.addTaskTime();

  getDestinationTaskTime = () => this.destination.addTaskTime();

  isEqualDestination = destinationToCheck => this.destination.isEqual(destinationToCheck);
}

export default Edge;