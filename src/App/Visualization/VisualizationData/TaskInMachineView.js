import React from 'react';
import PropTypes from 'prop-types';
import '../VisualizationView/TaskInMachineView.css';

const colorArray = {};

class TaskInMachineView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      startTime: props.timeStart,
      duration: props.duration
    };
  }

  generateColor() {
    const renderColor = Math.random().toString(16).substr(-6);
    const hexColor = `#${renderColor}`;
    return hexColor;
  }


  render() {
    while (!colorArray[this.state.name]) {
      const generatedColor = this.generateColor();
      let isColorUsed = false;
      for (const key in colorArray) {
        if (colorArray[key] === generatedColor) {
          isColorUsed = true;
          console.log('Saaame');
          break;
        }
      }
      if (!isColorUsed) {
        colorArray[this.state.name] = generatedColor;
      }
    }
    return (


      <span style={{ width: this.state.duration, left: this.state.startTime, background: colorArray[this.state.name] }} className="taskBox">
        {' '}
        {this.state.name}
      </span>

    );
  }
}
TaskInMachineView.propTypes = {
  name: PropTypes.string.isRequired,
  timeStart: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export default TaskInMachineView;
