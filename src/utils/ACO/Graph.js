import Edge from './Edge';

class Graph {
  data = new Map();

  addNode = (nodeName) => {
    this.data.set(nodeName, []);
  };

  addEdge = (src, destination) => {
    this.data.get(src).push(new Edge(src, destination));
    this.data.get(destination).push(new Edge(destination, src));
  };

  checkEdge = (pointA, pointB) => this.data.get(pointA).filter(edge => edge.isEqual(pointB))[0] || null;

  getEdge = (src, destination) => this.checkEdge(src, destination) || this.checkEdge(destination, src);

  getSize = () => this.data.size;

  getNodes = () => [...this.data.keys()];
}


export default Graph;