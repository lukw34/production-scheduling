import React from 'react';
import ParametersBox from '../MainPage/ParametersBox';
import Visualization from '../Visualization/VisualizationData/Visualization';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <ParametersBox />
        <Visualization machineList={[{
          name: 'Machine 1',
          taskInMachineList: [{
            name: 'job1', timeStart: 0, duration: 20
          },
          {
            name: 'job2', timeStart: 25, duration: 30
          }, {
            name: 'job3', timeStart: 60, duration: 50
          }, {
            name: 'job4', timeStart: 110, duration: 90
          }, {
            name: 'job5', timeStart: 220, duration: 90
          },
          {
            name: 'job6', timeStart: 320, duration: 90
          }]
        }, {
          name: 'Machine 2',
          taskInMachineList: [{
            name: 'job1', timeStart: 10, duration: 20
          },
          {
            name: 'job2', timeStart: 35, duration: 40
          }, {
            name: 'job3', timeStart: 80, duration: 30
          }, {
            name: 'job25', timeStart: 500, duration: 1500
          }, {
            name: 'job25', timeStart: 2050, duration: 200
          }]
        },
        {
          name: 'Machine 3',
          taskInMachineList: [{
            name: 'job1', timeStart: 5, duration: 20
          },
          {
            name: 'job2', timeStart: 35, duration: 40
          }, {
            name: 'job3', timeStart: 130, duration: 120
          }, {
            name: 'job7', timeStart: 220, duration: 90
          },
          {
            name: 'job10', timeStart: 320, duration: 90
          }]
        }
        ]}
        />
      </div>
    );
  }
}

export default MainComponent;