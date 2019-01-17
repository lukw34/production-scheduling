export default (graph) => {
  const visitedFromStart = [];
  const visitedFromFinish = [];
  const edges = graph.getAllEdges();
  console.log(graph.getAdjacencyList());
}