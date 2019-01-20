import { tabuSearch, simulatedAnnealing } from './getJSSSolution';
import dataset from './JSSProblem';


describe('get solution', () => {
  it('in correct format', () => {
    const data = {
      job0: [{
        machineId: 'M0',
        time: 3
      }, {
        machineId: 'M1',
        time: 5
      }, {
        machineId: 'M2',
        time: 2
      }, {
        machineId: 'M3',
        time: 2
      }],
      job1: [{
        machineId: 'M3',
        time: 2
      }, {
        machineId: 'M0',
        time: 2
      }, {
        machineId: 'M2',
        time: 1
      }, {
        machineId: 'M1',
        time: 2
      }],
      job2: [{
        machineId: 'M1',
        time: 4
      }, {
        machineId: 'M3',
        time: 3
      }, {
        machineId: 'M2',
        time: 3
      }, {
        machineId: 'M0',
        time: 5
      }],
      job3: [{
        machineId: 'M3',
        time: 2
      }, {
        machineId: 'M2',
        time: 6
      }, {
        machineId: 'M0',
        time: 4
      }, {
        machineId: 'M1',
        time: 2
      }]
    };

    expect(tabuSearch(data).data[0].taskInMachineList).toEqual([{
      jobId: 'job0:M0:0', name: 'job0', duration: 3, timeToStart: 0
    },
    {
      jobId: 'job1:M0:1', name: 'job1', duration: 2, timeToStart: 3
    },
    {
      jobId: 'job3:M0:2', name: 'job3', duration: 4, timeToStart: 5
    },
    {
      jobId: 'job2:M0:3', name: 'job2', duration: 5, timeToStart: 9
    }]);
  });
});