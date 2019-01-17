import ProductionSequence from '../Problem/Schedule';

class Solution {
  leftSchedule = [];

  rightSchedule = [];

  productionSequence = [];

  addToScheduleFromLeft = (job) => {
    this.leftSchedule = [...this.leftSchedule, job];
  };

  addToScheduleFromRight = (job) => {
    this.leftSchedule = [job, ...this.rightSchedule];
  };
}

export default Solution;