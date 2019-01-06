import ProductionSequence from './ProductionSequence';
import { probabilityCalculator, getWheelTarget } from './calculations';

class Ant {
  calculateProbability;

  productionSequence;

  graph;

  currentTask;

  qParameter;

  nodesNotYetVisited = [];

  nodesAllowedToVisit = [];

  nodesAlreadyVisited = [];

  constructor(currentTask, graph, { alpha, beta, q } = {}) {
    this.productionSequence = new ProductionSequence(graph.getSize());
    this.currentTask = currentTask;
    this.productionSequence.addTask(currentTask);
    this.calculateProbability = probabilityCalculator(alpha, beta);
    this.graph = graph;
    this.qParameter = q;
  }


  getTour = () => this.productionSequence.getMakeSpan();
  
  run = () => {
    while (!this.isSequenceFound()) {
      this.nextMove();
    }

    this.productionSequence.print();
  };

  isSequenceFound = () => this.productionSequence.isFull();

  getProductionSequence = () => this.productionSequence;

  nextMove = () => {
    const tasks = this.graph.getNodes();
    const uncheckedTasks = tasks
      .filter(task => !this.productionSequence.contains(task))
      .map(task => this.graph.getEdge(this.currentTask.getId(), task))
      .filter(edge => !!edge);
    const probabilities = uncheckedTasks
      .map(edge => this.calculateProbability(edge.getPheromone(), edge.getDestinationTaskTime()));
    const wheelTarget = getWheelTarget(probabilities);
    let wheelPosition = 0.0;
    for (let i = 0; i < uncheckedTasks.length; i += 1) {
      wheelPosition += probabilities[i];
      if (wheelPosition >= wheelTarget) {
        const newCurrentTask = uncheckedTasks[i].getDestinationTask();
        this.currentTask = newCurrentTask;
        this.productionSequence.addTask(newCurrentTask);
        return;
      }
    }
  };

  addPheromone = (weight = 1) => {
    const extraPheromone = (this.qParameter * weight) / this.productionSequence.getMakeSpan();
    this.productionSequence.processSequence((task, index, arr) => {
      const edge = this.graph.getEdge(task.getId(), arr[(index + 1) % arr.length].getId());
      if (edge) {
        edge.addPheromone(pheromone => pheromone + extraPheromone);
      }
    });
  };
}

export default Ant;