import Graph from '../Problem/Graph';
import Ant from './Ant';

class AntColony {
  graph = new Graph();

  colony = [];

  params = {
    alpha: 0.5,
    beta: 0.2,
    rho: 0.1,
    q: 0.3,
    initPheromone: 0.6,
    maxIterations: 50,
    colonySize: 300,
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
      this.step(i);
    }
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
    const gb = this.getGlobalBest();
    if (gb) {
      gb.addPheromone(this.params.elitistWeight);
    }
  };


  getIterationBest = () => {
    const [best] = this.colony.filter(ant => !!ant.getTour());
    return this.colony.filter(ant => !!ant.getTour()).reduce((prev, act) => {
      if (prev.getTour() > act.getTour()) {
        return act;
      }
      return best;
    }, best);
  };

  getGlobalBest = () => {
    const bestAnt = this.getIterationBest();
    if (!!bestAnt.getTour() && (this.globalBest === null || this.globalBest.getTour() > bestAnt.getTour())) {
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