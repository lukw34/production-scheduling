import Graph from './Graph';
import Job from './Job';
import Problem from './Problem';

const connectTaskOnTheSameMachine = (graph, machineIds, tasks, problemDefinition) => {
  const nodes = graph.getNodes();
  const machineJobs = machineIds
    .map(machineId => nodes.filter(nodeName => nodeName.split(':')[1] === machineId));
  problemDefinition.addMachineJobs(machineJobs);
  machineJobs.forEach((machineTasks) => {
    const processedTasks = [...machineTasks];
    while (processedTasks.length > 1) {
      const coreTask = processedTasks.shift();
      processedTasks.forEach(task => graph.addBidirectionalEdge(tasks[task], tasks[coreTask]));
    }
  });
};

const parseOneJob = (tasks, graph) => {
  const lastTask = tasks.reduce((srcTask, task) => {
    graph.addNode(task.getId());
    graph.addEdge(srcTask, task);
    return task;
  }, Graph.startNode);
  graph.addEdge(lastTask, Graph.finishNode);
};

const generateDisjunctiveGraph = (dataSet) => {
  const graph = new Graph();
  const machineIds = new Set();
  const problemDefinition = new Problem();
  problemDefinition.addJobs([Graph.startNode]);
  const jobObj = {};
  graph.addNode(Graph.startNode.getId());
  graph.addNode(Graph.finishNode.getId());
  Object.keys(dataSet).forEach((key) => {
    const jobs = dataSet[key]
      .map(({ time, machineId }, index) => {
        machineIds.add(machineId);
        const jobId = `${key}:${machineId}:${index}`;
        const job = new Job(jobId, time, machineId);
        jobObj[jobId] = job;
        return job;
      });
    problemDefinition.addJobs(jobs);
    problemDefinition.addJobs([Graph.finishNode]);
    problemDefinition.addJobSequence(jobs);
    parseOneJob(jobs, graph);
  });
  connectTaskOnTheSameMachine(graph, [...machineIds], jobObj, problemDefinition);
  problemDefinition.setGraph(graph);
  return problemDefinition;
};


export default data => generateDisjunctiveGraph(data);