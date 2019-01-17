import Graph from '../Problem/Graph';
import Solution from './Solution'''
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

export const getInitialSolution = (problem) => {
  const numberOfOperations = problem.getNumberOfOperations();
  const initialSolution = new Solution;
  const { first, last } = problem.getFirstAndLastFromEachJobSequence();
  const scheduledFromBegining = new Map(first);
  const scheduledFromEnd = new Map(last);
  const fromLeft = new Set();
  const fromRight = new Set();
  fromLeft.add(Graph.startNode.getId());
  fromRight.add(Graph.finishNode.getId());
  // while (fromRight.size + fromLeft.size > numberOfOperations) {
  const { value: minValue, id: job } = getPriorJob(scheduledFromBegining);
  initialSolution.addToScheduleFromLeft(job);
  scheduledFromBegining(job);
  fromLeft.add(job)
  // }
};
