import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Visualization from './App/Visualization/VisualizationData/Visualization';
import ParametersBox from './App/MainPage/ParametersBox';

ReactDOM.render(
  <div>
    <ParametersBox />
    <Visualization machineList={[{
      name: 'Machine 1',
      taskInMachineList: [{
        name: 'task1', generatedColor: '#547358', timeStart: 0, duration: 20
      },
      {
        name: 'task2', generatedColor: '#AF5B77', timeStart: 25, duration: 30
      }, {
        name: 'task3', generatedColor: '#7F111B', timeStart: 60, duration: 50
      }, {
        name: 'task4', generatedColor: '#11BB1B', timeStart: 110, duration: 90
      }, {
 name: 'task5', generatedColor: '#00AACC', timeStart: 220, duration: 90 
},
      {
 name: 'task6', generatedColor: '#11D926', timeStart: 320, duration: 90 
}]
    }, {
      name: 'Machine 2',
      taskInMachineList: [{
        name: 'task1', generatedColor: '#547358', timeStart: 10, duration: 20
      },
      {
        name: 'task2', generatedColor: '#AF5B77', timeStart: 35, duration: 40
      }, {
        name: 'task3', generatedColor: '#7F111B', timeStart: 80, duration: 30
      }]
    },
    {
      name: 'Machine 3',
      taskInMachineList: [{
        name: 'task1', generatedColor: '#547358', timeStart: 5, duration: 20
      },
      {
        name: 'task2', generatedColor: '#AF5B77', timeStart: 35, duration: 40
      }, {
        name: 'task3', generatedColor: '#7F111B', timeStart: 130, duration: 120
      }]
    }
    ]}
    />
  </div>, document.getElementById('root')
);