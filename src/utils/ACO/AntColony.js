import Graph from './Graph';
import Ant from './Ant';

class AntColony {
  graph = new Graph();
  colony = [];
  
  params = {
    alpha: 1,
    beta: 3,
    rho: 0.1,
    q: 1,
    initPheromone: this.params.q,
    maxIterations: 250,
    colonySize: 20
  };

  iterationBest = null;
  globalBest = null;

  constructor(params) {
    this.params = {
      ...this.params,
      ...params
    };
  }

  run = () => {
    for (let i = 0; i < this.params.maxIterations; i += 1) {
      this.step();
    }
  };

  step = () => {
    this.resetAnts();
    this.colony.forEach(ant => ant.run());
  };
  
  resetAnts = () => {
    this.createAnts();
    this.iterationBest = null;
  };
  
  createAnts = () => {
    const { alpha, beta, q } = this.params;
    this.colony = [...new Array(this.params.colonySize)].map(() => new Ant('task', this.graph, {
      alpha,
      beta,
      q
    }));
  };
}

export default AntColony;