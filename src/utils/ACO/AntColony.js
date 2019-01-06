import Graph from './Graph';
import Ant from './Ant';

class AntColony {
  graph = new Graph();

  colony = [];

  params = {
    alpha: 0.4,
    beta: 3,
    rho: 0.1,
    q: 1,
    initPheromone: 1,
    maxIterations: 200,
    colonySize: 200,
    elitistWeight: 0
  };

  globalBest = null;

  constructor(graphWithData, params) {
    this.graph = graphWithData;
    this.params = {
      ...this.params,
      ...params
    };
  }

  run = () => {
    for (let i = 0; i < this.params.maxIterations; i += 1) {
      console.log(i)
      this.step(i);
    }
    console.log('aasd')
    return this.globalBest.getTour();
  };

  step = () => {
    this.resetAnts();
    this.colony.forEach(ant => ant.run());
    this.updatePheromone();
  };

  updatePheromone = () => {
    this.graph.getEdges()
      .forEach(edge => edge.addPheromone(pheromone => pheromone * (1 - this.params.rho)));
    this.colony.forEach(ant => ant.addPheromone());
    this.getGlobalBest().addPheromone(this.params.elitistWeight);
  };


  getIterationBest = () => {
    const [best] = this.colony;
    return this.colony.reduce((prev, act) => {
      if (prev.getTour() < act.getTour()) {
        return act;
      }
      return best;
    }, best);
  };

  getGlobalBest = () => {
    const bestAnt = this.getIterationBest();
    if (this.globalBest === null || this.globalBest.getTour() < bestAnt.getTour()) {
      this.globalBest = bestAnt;
    }
    
    return this.globalBest;
  };

  resetAnts = () => {
    this.createAnts();
    this.iterationBest = null;
  };

  createAnts = () => {
    const { alpha, beta, q } = this.params;
    this.colony = [...new Array(this.params.colonySize)].map(() => new Ant(Graph.startNode, this.graph, {
      alpha,
      beta,
      q
    }));
  };
}

export default AntColony;