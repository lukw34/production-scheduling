import topologicalSort from '../TopologicalSort/index';
import Graph from './Graph';
import Move from './Move';

class Solution {
  schedule = {};

  problem = null;

  solutionGraph = null;

  constructor(problem) {
    this.problem = problem;
    this.solutionGraph = problem.getGraphCopy();
  }

  addConnectionInGraph = (job, collection) => {
    if (collection && collection.lastElement()) {
      this.solutionGraph.addEdge(this.problem.getJob(collection.lastElement()), this.problem.getJob(job));
    }
  };

  addToScheduleFromLeft = (job) => {
    const [, machine] = job.split(':');
    this.addConnectionInGraph(job, [...this.schedule[machine] || []]);
    this.schedule = {
      ...this.schedule,
      [machine]: [
        ...this.schedule[machine] || [],
        job
      ]
    };
  };


  getSchedule = () => Object.keys(this.schedule).reduce((prev, actual) => ({
    ...prev,
    [actual]: [...this.schedule[actual] || []]
  }), {});

  getAdjacencyRepresentation = (costCallback = edge => edge.getDestination().getTime() + edge.getSrc().getTime()) => {
    const list = this.solutionGraph.getAdjacencyList(costCallback);
    return Object.keys(list).reduce((prev, key) => ({
      ...prev,
      [key]: list[key].map(({ id: job, cost }) => ({ id: job, duration: cost / 2 }))
    }), {});
  };

  getSolutionCost = () => {
    const sortedStack = topologicalSort(this).reverse();
    const list = this.getAdjacencyRepresentation();
    const labels = sortedStack.reduce((prev, job) => {
      const newObj = { ...prev };
      const prevValue = id => (prev[id] && prev[id].cost) || 0;
      const prevPath = id => (prev[id] && prev[id].path) || [];
      list[job]
        .forEach(({ id: jobId, duration }) => {
          const value = prevValue(job) + (duration + this.problem.getJob(job).getTime()) / 2;
          if ((prevValue(jobId) || 0) < value) {
            newObj[jobId] = {
              path: new Set([...prevPath(job), job]),
              cost: value
            };
          }
        });
      return newObj;
    }, {});
    return labels[Graph.finishNode.getId(0)];
  };

  getPossibleInversions = () => {
    const path = [...this.getSolutionCost().path];
    return path.reduce((inversions, job, index) => {
      if (index > 1) {
        const [, prevMachine = null] = path[index - 1].split(':');
        const [, machine] = job.split(':');
        if (prevMachine && prevMachine === machine) {
          return [...inversions, new Move(path[index - 1], job)];
        }
      }

      return inversions;
    }, []);
  };


 static generateNewSolutionSchedule = (schedule, problem) => {
   const newSolution = new Solution(problem);
   Object.keys(schedule).forEach(key => schedule[key].forEach(job => newSolution.addToScheduleFromLeft.apply(newSolution, [job])));
   return newSolution;
 }
}

export default Solution;