import Solution from '../Problem/Solution';

class Move {
  inversion = []

  constructor(candidate1, candidate2) {
    this.inversion = [candidate1, candidate2];
  }

  getInversion = () => this.inversion;

  isEqual = move => move.getInversion()
    .reduce((equal, el, index) => equal && el === this.inversion[index], true)

  applyToSolution(solution, problem) {
    const schedule = solution.getSchedule();
    const [j1, j2] = this.inversion;
    const [, machine] = j1.split(':');
    const indexOfJob = schedule[machine].indexOf(j1);
    schedule[machine][indexOfJob] = j2;
    schedule[machine][indexOfJob + 1] = j1;
    return Solution.generateNewSolutionSchedule(schedule, problem);
  }
}

export default Move;
