import Graph from './Graph';
import Solution from './Solution';

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

export default (problem) => {
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