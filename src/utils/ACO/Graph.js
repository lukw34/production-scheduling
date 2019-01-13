import Edge from './Edge';
import Task from './Task';

class Graph {
  data = new Map();

  edgeCount = 0;

  addNode = (nodeName) => {
    this.data.set(nodeName, []);
  };

  addEdge = (src, destination) => {
    this.edgeCount += 1;
    this.data.get(src.getId()).push(new Edge(src, destination));
  };

  addBidirectionalEdge = (src, destination) => {
    this.addEdge(src, destination);
    this.addEdge(destination, src);
  };

  getEdges = () => [...this.data.entries()].reduce((prev, [, edges]) => [...prev, ...edges], []);

  getEdgeCount = () => this.edgeCount;

  getEdge = (src, destination) => this.data.get(src).filter(edge => edge.isEqualDestination(destination))[0] || null;

  getEdgesFromNode = nodeName => [...this.data.get(nodeName)];

  getSize = () => this.data.size;

  getNodes = () => [...this.data.keys()];

  getAllEdges = () => [].concat(...[...this.data.entries()].map(([, el]) => el));

  static startNode = new Task('start-0', 0, null);


  static parseOneJob = (tasks, graph) => {
    tasks.reduce((srcTask, task) => {
      graph.addNode(task.getId());
      graph.addEdge(srcTask, task);
      return task;
    }, Graph.startNode);
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