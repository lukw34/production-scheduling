import generateProblem from './Problem';
import { tabuSearch as tabuSearchImpl } from './TabuSearch';
import { simulatedAnnealing as simulatedAnnealingImpl } from './SimulatedAnnealing';

const getSolution = (algorithm, dataset, parameters = {}) => {
  const startTime = performance.now();
  const problem = generateProblem(dataset);
  const solution = algorithm(problem, parameters);
  const endTime = performance.now();
  const schedule = solution.getSchedule();
  const { cost } = solution.getSolutionCost();
  const data = Object.keys(schedule).map(key => ({
    name: key,
    taskInMachineList: schedule[key].reduce((prev, job, index) => {
      const [jobName] = job.split(':');
      const jobObj = problem.getJob(job);
      const { duration = 0, timeToStart = 0 } = prev[index - 1] || {};
      return ([...prev, {
        jobId: job,
        name: jobName,
        duration: jobObj.getTime(),
        timeToStart: duration + timeToStart
      }]);
    }, [])
  }));

  const executionTime = endTime - startTime;
  return {
    executionTime,
    data,
    cost
  };
};

export const tabuSearch = (data, parameters) => getSolution(tabuSearchImpl, data, parameters);

export const simulatedAnnealing = (data, parameters) => getSolution(simulatedAnnealingImpl, data, parameters);