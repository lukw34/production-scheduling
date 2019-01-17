import { getInitialSolution } from '.';
import generateProblem from "../Problem";

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
      }]
    };
    const problem = generateProblem(jobs)
    getInitialSolution(problem);
  });
});