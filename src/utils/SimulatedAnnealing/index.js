import getSolution from '../Problem/getInitialSolution';

Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const isAcceptedSolution = (energy, newEnergy, temperature) => (newEnergy < energy ? 1 : Math.exp((energy - newEnergy) / temperature));

export const getInitialSolution = getSolution;

export const simulatedAnnealing = (problem, {
  initialTemp = 10000,
  coolingRate = 0.003,
  minTemp = 1
} = {}) => {
  const initialSolution = getInitialSolution(problem);
  let { cost: bestCost } = initialSolution.getSolutionCost();
  let bestSolution = initialSolution;
  let lastSolution = initialSolution;
  let lastCost = bestCost;
  let temperature = initialTemp;
  while (temperature > minTemp) {
    const move = lastSolution.getPossibleInversions().randomElement();
    const newSolution = move.applyToSolution(lastSolution, problem);
    const { cost } = newSolution.getSolutionCost();

    if (isAcceptedSolution(lastCost, cost, temperature) > Math.random()) {
      lastSolution = newSolution;
      lastCost = cost;
    }

    if (cost < bestCost) {
      bestSolution = newSolution;
      bestCost = cost;
    }

    temperature *= 1 - coolingRate;
  }
  return bestSolution;
};