class Edge {
  src;

  destination;

  constructor(src, destination) {
    this.src = src;
    this.destination = destination;
  }

  getDestination = () => this.destination;

  isEqualDestination = destinationToCheck => this.destination.isEqual(destinationToCheck);
}

export default Edge;