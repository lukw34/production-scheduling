import AntColony from './AntColony';
import Graph from '../Problem/Graph';

export default (data) => {
  const colony = new AntColony(Graph.generateDisjunctiveGraph(data));
  const b = colony.run();

  console.log(`PB:  ${b}`);
};