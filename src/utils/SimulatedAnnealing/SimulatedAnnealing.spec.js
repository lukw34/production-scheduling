import { simulatedAnnealing } from '.';
import generateProblem from '../Problem';

describe('TabuSearch', () => {
  it('return simuilatedAnnealing solution', () => {
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
    const solution = simulatedAnnealing(problem);
    expect(solution.getSolutionCost().cost).toBe(17);
  });
});