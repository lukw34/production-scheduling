export const probabilityCalculator = (alpha, beta) => (pheromone, time) => (pheromone ** alpha) * ((1 / time) ** beta);


export const getWheelTarget = probabilities => probabilities.reduce((prev, act) => prev + act, 0) * Math.random();