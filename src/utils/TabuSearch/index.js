import Graph from '../Problem/Graph';
import Solution from '../Problem/Solution';
import TabuList from './TabuList';
/**
 * Get job with the smallest value
 *
 * @param scheduledJobs
 * @returns {*}
 */
const getPriorJob = scheduledJobs => [...scheduledJobs].reduce(({ id, value }, [jobId, newValue]) => {
  if (value > newValue) {
    return {
      id: jobId,
      value: newValue
    };
  }

  return {
    id, value
  };
}, {
  value: Number.MAX_SAFE_INTEGER,
  id: null
});


const scheduledJob = (mainSchedulable, secondSchedulable, scheduled, solution, problem, setSchedule) => {
  const { value: minValue, id: job } = getPriorJob(mainSchedulable);
  if (job !== null) {
    setSchedule(job);
    mainSchedulable.delete(job);
    scheduled.add(job);
    const successor = problem.getSuccessor(job);
    if (secondSchedulable.has(job)) {
      secondSchedulable.delete(job);
    }


    if (successor !== null && !mainSchedulable.has(successor.getId())) {
      mainSchedulable.set(successor.getId(), successor.getTime() + minValue);
    }
    [...mainSchedulable].forEach(([el, elValue]) => {
      const [, elMachine] = el.split(':');
      const jobObj = problem.getJob(job);
      if (jobObj.getMachine() === elMachine) {
        mainSchedulable.set(el, elValue + jobObj.getTime());
      }
    });
  }
};

const isScheduled = (left, right, numberOfOperations) => right.size + left.size < numberOfOperations;

export const getInitialSolution = (problem) => {
  const numberOfOperations = problem.getNumberOfOperations();
  const initialSolution = new Solution(problem);
  const { first, last } = problem.getFirstAndLastFromEachJobSequence();
  const schedulableFromBegining = new Map(first);
  const schedulableFromEnd = new Map(last);
  const scheduledFromFirst = new Set();
  const scheduledFromLast = new Set();
  scheduledFromFirst.add(Graph.startNode.getId());
  scheduledFromLast.add(Graph.finishNode.getId());
  while (isScheduled(scheduledFromFirst, scheduledFromLast, numberOfOperations)) {
    scheduledJob(
      schedulableFromBegining,
      schedulableFromEnd,
      scheduledFromFirst,
      initialSolution,
      problem,
      initialSolution.addToScheduleFromLeft
    );
  }
  return initialSolution;
};

export const tabuSearch = (problem, {
  tabuSize = 8,
  maxIteration = 20,
  maxIterationWithoutImprovements = 20
} = {}) => {
  const initialSolution = getInitialSolution(problem);
  let { cost: bestCost } = initialSolution.getSolutionCost();
  const tabu = new TabuList(tabuSize);
  let bestSolution = initialSolution;
  let lastSolution = initialSolution;
  let iteration = 0;
  let iterationWithoutImprovements = 0;
  while (iteration < maxIteration && iterationWithoutImprovements < maxIterationWithoutImprovements) {
    const bestPossibleSolution = lastSolution.getPossibleInversions()
      .filter(move => !tabu.contain(move))
      .map((move) => {
        const newSolution = move.applyToSolution(lastSolution, problem);
        const { cost: newSolutionCost } = newSolution.getSolutionCost();
        return {
          cost: newSolutionCost,
          solution: newSolution,
          move
        };
      }).sort((a, b) => a.cost - b.cost);
    if (bestPossibleSolution[0]) {
      const { cost, solution, move } = bestPossibleSolution[0];
      lastSolution = solution;
      tabu.addItem(move);
      if (bestCost > cost) {
        bestSolution = solution;
        bestCost = cost;
      }

      if (bestCost === cost) {
        iterationWithoutImprovements += 1;
      } else {
        iterationWithoutImprovements = 0;
      }
    } else {
      iterationWithoutImprovements += 1;
    }

    iteration += 1;
  }

  return bestSolution;
};