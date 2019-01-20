import getSolution from '../Problem/getInitialSolution';
import TabuList from './TabuList';

export const getInitialSolution = getSolution;

export const tabuSearch = (problem, {
  tabuSize = 10,
  maxIteration = 200,
  maxIterationWithoutImprovements = 30
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