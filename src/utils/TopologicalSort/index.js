const sort = (job, visited, adjacencyRepresentation, stack) => {
  visited.add(job);
  adjacencyRepresentation[job].forEach(({ id: node }) => {
    if (!visited.has(node)) {
      sort(node, visited, adjacencyRepresentation, stack);
    }
  });

  stack.push(job);
};

export default (solution) => {
  const visitedNods = new Set();
  const stack = [];
  const nodes = solution.problem.getJobs();
  const adjacencyRepresentation = solution.getAdjacencyRepresentation();
  nodes.forEach((job) => {
    if (!visitedNods.has(job)) {
      sort(job, visitedNods, adjacencyRepresentation, stack);
    }
  });
  return stack;
};