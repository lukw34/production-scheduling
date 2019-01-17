import ProductionSequence from '../Problem/Schedule';
import { probabilityCalculator, getWheelTarget } from './calculations';
import Graph from '../Problem/Graph';

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

  getTour = () => {
    if (!this.isSequenceFound()) {
      return null;
    }
    return this.productionSequence.getMakeSpan();
  };


  run = () => {
    this.graph.getAllEdges().forEach((l) => {
      l.src.resetMakespan();
      l.destination.resetMakespan();
    });
    let uncheckedTasks = this.getPossibleTasks();
    while (!this.isSequenceFound() && uncheckedTasks.length > 0) {
      this.nextMove(uncheckedTasks);
      uncheckedTasks = this.getPossibleTasks();
    }

    if (this.isSequenceFound()) {
      this.productionSequence.print();
    }
  };

  isSequenceFound = () => this.productionSequence.isFull();

  getProductionSequence = () => this.productionSequence;

  nextMove = (uncheckedTasks) => {
    const probabilities = uncheckedTasks
      .map(edge => this.calculateProbability(edge.getPheromone(), edge.getDestinationTaskTime()));
    const wheelTarget = getWheelTarget(probabilities);
    let wheelPosition = 0.0;
    for (let i = 0; i < uncheckedTasks.length; i += 1) {
      wheelPosition += probabilities[i];
      if (wheelPosition >= wheelTarget) {
        const newCurrentTask = uncheckedTasks[i].getDestinationTask();
        this.currentTask = newCurrentTask;
        this.currentTask.setMakespan(this.getMakespanOfSrcTask(newCurrentTask));
        this.productionSequence.addTask(this.currentTask);
        return;
      }
    }
  };

  getMakespanOfSrcTask = (taskToCheck) => {
    const makespans = this.productionSequence
      .processSequence(task => !!this.graph.getEdge(task.getId(), taskToCheck.getId()), 'filter')
      .map(task => task.getMakespan());
    return Math.max(...makespans);
  };

  getPossibleTasks = () => {
    const edgeFromStart = this.currentTask.getId() !== Graph.startNode.getId()
      ? this.graph.getEdgesFromNode(Graph.startNode.getId()) : [];
    const edges = [
      ...this.graph.getEdgesFromNode(this.currentTask.getId()),
      ...edgeFromStart
    ];
    const possibleCandidates = edges.filter((edge) => {
      const [jobId, , position] = edge.getDestinationTask().getId().split(':');
      if (position === '0') {
        return true;
      }
      const regExp = new RegExp(`^${jobId}:.*:${Number(position) - 1}$`);
      return this.productionSequence.contains(regExp);
    });

    return possibleCandidates
      .filter(edge => !this.productionSequence.contains(edge.getDestinationTask()));
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