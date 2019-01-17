import Edge from './Edge';
import Task from './Job';

class Graph {
  data = new Map();

  edgeCount = 0;

  addNode = (nodeName) => {
    this.data.set(nodeName, []);
  };

  addEdge = (src, destination) => {
    this.edgeCount += 1;
    this.data.get(src.getId()).push(new Edge(src, destination));
  };

  addBidirectionalEdge = (src, destination) => {
    this.addEdge(src, destination);
    this.addEdge(destination, src);
  };

  getEdges = () => [...this.data.entries()].reduce((prev, [, edges]) => [...prev, ...edges], []);

  getEdgeCount = () => this.edgeCount;

  getEdge = (src, destination) => (this.data.get(src) || []).filter(edge => edge.isEqualDestination(destination))[0] || null;

  getEdgesFromNode = nodeName => [...this.data.get(nodeName)];

  getSize = () => this.data.size;

  getNodes = () => [...this.data.keys()];

  getAllEdges = () => [].concat(...[...this.data.entries()].map(([, el]) => el));

  static startNode = new Task('start', 0, null);

  static finishNode = new Task('finish', 0, null);
  
  getAdjacencyList = () => this.getNodes().reduce((prev, current) => ({
    ...prev,
    [current]: this.getEdgesFromNode(current).map(edge => edge.getDestination().getId())
  }), {});
}


export default Graph;