import topologicalSort from '.';
import generateProblem from '../Problem';


describe('TopologicalSort', () => {
  it('it should sort given graph', () => {
    const dataSet = {
      job1: [{
        machineId: 'M0',
        time: 3
      }, {
        machineId: 'M1',
        time: 2
      }, {
        machineId: 'M2',
        time: 2
      }],
      job2: [{
        machineId: 'M0',
        time: 2
      }, {
        machineId: 'M2',
        time: 1
      }, {
        machineId: 'M1',
        time: 4
      }],
      job3: [{
        machineId: 'M1',
        time: 4
      }, {
        machineId: 'M2',
        time: 3
      }]
    };
    const { graph, jobs } = generateProblem(dataSet);
    topologicalSort(graph, jobs);
  });
});
