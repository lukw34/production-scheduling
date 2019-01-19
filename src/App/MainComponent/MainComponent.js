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
            name: 'job1', generatedColor: '#547358', timeStart: 0, duration: 20
          },
          {
            name: 'job2', generatedColor: '#AF5B77', timeStart: 25, duration: 30
          }, {
            name: 'job3', generatedColor: '#7F111B', timeStart: 60, duration: 50
          }, {
            name: 'job4', generatedColor: '#11BB1B', timeStart: 110, duration: 90
          }, {
            name: 'job5', generatedColor: '#00AACC', timeStart: 220, duration: 90
          },
          {
            name: 'job6', generatedColor: '#11D926', timeStart: 320, duration: 90
          }]
        }, {
          name: 'Machine 2',
          taskInMachineList: [{
            name: 'job1', generatedColor: '#547358', timeStart: 10, duration: 20
          },
          {
            name: 'job2', generatedColor: '#AF5B77', timeStart: 35, duration: 40
          }, {
            name: 'job3', generatedColor: '#7F111B', timeStart: 80, duration: 30
          }, {
            name: 'job25', generatedColor: '#7F111B', timeStart: 500, duration: 1500
          }, {
            name: 'job25', generatedColor: '#7F111B', timeStart: 2050, duration: 200
          }]
        },
        {
          name: 'Machine 3',
          taskInMachineList: [{
            name: 'job1', generatedColor: '#547358', timeStart: 5, duration: 20
          },
          {
            name: 'job2', generatedColor: '#AF5B77', timeStart: 35, duration: 40
          }, {
            name: 'job3', generatedColor: '#7F111B', timeStart: 130, duration: 120
          }, {
            name: 'job7', generatedColor: '#00AACC', timeStart: 220, duration: 90
          },
          {
            name: 'job10', generatedColor: '#11D926', timeStart: 320, duration: 90
          }]
        }
        ]}
        />
      </div>
    );
  }
}

export default MainComponent;