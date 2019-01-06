import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App/index';
import Visualization from './App/Visualization/VisualizationData/Visualization';

ReactDOM.render(<Visualization machineList={[{
  name: "Machine1", taskInMachineList: [{ name: 'task1', timeStart: 0, duration: 2 },
  { name: 'task2', timeStart: 1, duration: 10 }, { name: 'task3', timeStart: 4, duration: 5 }]
}, {
  name: "Machine2", taskInMachineList: [{ name: 'task1', timeStart: 0, duration: 2 },
  { name: 'task2', timeStart: 1, duration: 10 }, { name: 'task3', timeStart: 4, duration: 5 }]
}]}
// name="machine",
// taskInMachine={[{ name: 'task1', timeStart: 0, duration: 2 },
//   { name: 'task2', timeStart: 1, duration: 10 }, { name: 'task3', timeStart: 4, duration: 5 }]}
/>, document.getElementById('root'));
