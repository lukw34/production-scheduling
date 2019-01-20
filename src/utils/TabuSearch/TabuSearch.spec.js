import { getInitialSolution, tabuSearch } from '.';
import generateProblem from '../Problem';

describe('TabuSearch', () => {
  it('return initial solution', () => {
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
      }, {
        machineId: 'M0',
        time: 0
      }]
    };
    const problem = generateProblem(jobs);
    expect(getInitialSolution(problem).getSchedule()).toEqual({
      M0: ['job1:M0:0', 'job2:M0:0', 'job3:M0:2'],
      M1: ['job3:M1:0', 'job1:M1:1', 'job2:M1:2'],
      M2: ['job3:M2:1', 'job2:M2:1', 'job1:M2:2']
    });
  });

  it('return tabu search solution', () => {
    const jobs = {
      job0: [{
        machineId: 'M0',
        time: 3
      }, {
        machineId: 'M1',
        time: 2
      }, {
        machineId: 'M2',
        time: 2
      }, {
        machineId: 'M3',
        time: 2
      }],
      job1: [{
        machineId: 'M3',
        time: 2
      }, {
        machineId: 'M0',
        time: 2
      }, {
        machineId: 'M2',
        time: 1
      }, {
        machineId: 'M1',
        time: 4
      }],
      job2: [{
        machineId: 'M1',
        time: 4
      }, {
        machineId: 'M3',
        time: 3
      }, {
        machineId: 'M2',
        time: 3
      }, {
        machineId: 'M0',
        time: 5
      }],
      job3: [{
        machineId: 'M3',
        time: 2
      }, {
        machineId: 'M2',
        time: 6
      }, {
        machineId: 'M0',
        time: 4
      }, {
        machineId: 'M1',
        time: 2
      }]
    };
    const problem = generateProblem(jobs);
    const solution = tabuSearch(problem);
    expect(solution.getSolutionCost().cost).toBe(17);
  });
});