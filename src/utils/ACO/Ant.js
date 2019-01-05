import ProductionSequence from './ProductionSequence';
import { probabilityCalculator, getWheelTarget } from './calculations';

class Ant {
  calculateProbability;

  productionSequence;

  graph;

  currentTask;

  qParameter;

  constructor(currentTask, graph, { alpha, beta, q } = {}) {
    this.productionSequence = new ProductionSequence(graph.getSize());
    this.currentTask = currentTask;
    this.productionSequence.addTask(currentTask);
    this.calculateProbability = probabilityCalculator(alpha, beta);
    this.graph = graph;
    this.qParameter = q;
  }


  run = () => {
    while (!this.isSequenceFound()) {
      this.nextMove();
    }
  };

  isSequenceFound = () => this.productionSequence.isFull();


  nextMove = (tasks) => {
    const uncheckedTasks = tasks
      .filter(task => this.productionSequence.contains(task));
    const probabilities = uncheckedTasks
      .map(task => this.graph.getEdge(this.currentTask, task))
      .map(edge => this.calculateProbability(edge.getPheromone(), edge.getTime()));
    const wheelTarget = getWheelTarget(probabilities);
    let wheelPosition = 0.0;
    for (let i = 0; i < uncheckedTasks.length; i += 1) {
      wheelPosition += probabilities[i];
      if (wheelPosition >= wheelTarget) {
        const newCurrentTask = uncheckedTasks[i];
        this.currentTask = newCurrentTask;
        this.productionSequence.addTask(newCurrentTask);
        return;
      }
    }
  };

  addPheromone = (weight = 1) => {
    const extraPheromone = (this.qParameter * weight) / this.productionSequence.getMakeSpan();
    this.productionSequence.processSequence((task, index, arr) => {
      this.graph.getEdge(index, (index + 1) % arr.length).addPheromone(extraPheromone);
    });
  };
}

export default Ant;