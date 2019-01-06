import Edge from './Edge';
import Task from './Task';

class Graph {
  data = new Map();

  edgeCount = 0;

  addNode = (nodeName) => {
    this.data.set(nodeName, []);
  };

  addNodeWithAllPossibleEsges = (nodeName) => {
    const allNodes = [...this.data.keys()];
    this.addNode(nodeName);
    allNodes.forEach(node => this.addEdge(node, nodeName));
  };

  addEdge = (src, destination, time) => {
    this.edgeCount += 1;
    this.data.get(src.getId()).push(new Edge(src, destination, time));
  };

  addBidirectionalEdge = (src, destination) => {
    this.addEdge(src, destination);
    this.addEdge(destination, src);
  };

  getEdgeCount = () => this.edgeCount;

  getEdge = (src, destination) => this.data.get(src).filter(edge => edge.isEqualDestination(destination))[0] || null;;

  getSize = () => this.data.size;

  getNodes = () => [...this.data.keys()];


  static startNode = new Task('start-0', 0, null);

  static finishNode = new Task('finish', 0, null);

  static parseOneJob = (tasks, graph) => {
    const lastSrc = tasks.reduce((srcTask, task) => {
      graph.addNode(task.getId());
      graph.addEdge(srcTask, task);
      return task;
    }, Graph.startNode);
    graph.addEdge(lastSrc, Graph.finishNode);
  };

  static connectTaskOnTheSameMachine = (graph, machineIds, tasks) => {
    const nodes = graph.getNodes();
    machineIds
      .map(machineId => nodes.filter(nodeName => nodeName.split(':')[1] === machineId))
      .forEach((machineTasks) => {
        const processedTasks = [...machineTasks];
        while (processedTasks.length > 1) {
          const coreTask = processedTasks.shift();
          processedTasks.forEach(task => graph.addBidirectionalEdge(tasks[task], tasks[coreTask]));
        }
      });
  };

  static generateDisjunctiveGraph = (dataSet) => {
    const graph = new Graph();
    const machineIds = new Set();
    const tasksObj = {};
    graph.addNode(Graph.finishNode.getId());
    graph.addNode(Graph.startNode.getId());
    Object.keys(dataSet).forEach((key) => {
      const tasks = dataSet[key]
        .map(({ time, machineId }, index) => {
          machineIds.add(machineId);
          const taskId = `${key}:${machineId}:${index}`;
          const task = new Task(taskId, time, machineId);
          tasksObj[taskId] = task;
          return task;
        });
      Graph.parseOneJob(tasks, graph);
    });
    Graph.connectTaskOnTheSameMachine(graph, [...machineIds], tasksObj);
    return graph;
  }
}


export default Graph;