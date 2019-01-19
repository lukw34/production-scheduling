import generateProblem from '.';

describe('Problem', () => {
  it('should return correct graph for specific data', () => {
    const jobs = {
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
    const problem = generateProblem(jobs);
    const graph = problem.getGraph();
    expect(graph.getEdge('start', 'job1:M0:0')).not.toBeNull();
    expect(graph.getEdge('job1:M0:0', 'start-0')).toBeNull();
    expect(graph.getEdge('job2:M2:1', 'job2:M1:2')).not.toBeNull();
    expect(graph.getEdge('job2:M1:2', 'job2:M2:1')).toBeNull();
    expect(graph.getEdge('job2:M0:0', 'job3:M2:1')).toBeNull();
    // expect(graph.getEdge('job3:M2:1', 'job2:M2:1')).not.toBeNull();
    // expect(graph.getEdge('job2:M2:1', 'job3:M2:1')).not.toBeNull();
    // expect(graph.getEdge('job1:M0:0', 'job2:M0:0')).not.toBeNull();
    // expect(graph.getEdge('job3:M1:0', 'job2:M1:2')).not.toBeNull();
    expect(graph.getEdge('start', 'finish')).toBeNull();
    graph.addBidirectionalEdge(problem.getJob('job3:M2:1'), problem.getJob('job2:M2:1'));
    graph.removeEdge('job3:M2:1', 'job2:M2:1');
    expect(graph.getEdge('job3:M2:1', 'job2:M2:1')).toBeNull();
    expect(graph.getEdge('job2:M2:1', 'job3:M2:1')).not.toBeNull();
    expect(graph.getEdgeCount()).toBe(13);
  });
});