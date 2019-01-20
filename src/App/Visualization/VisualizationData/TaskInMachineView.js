import React from 'react';
import PropTypes from 'prop-types';
import '../VisualizationView/TaskInMachineView.css';

const colorArray = {};

class TaskInMachineView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      startTime: props.timeToStart,
      duration: props.duration
    };
  }

  generateColor() {
    const renderColor = Math.random().toString(16).substr(-6);
    const hexColor = `#${renderColor}`;
    return hexColor;
  }


  render() {
    while (!colorArray[this.props.name]) {
      const generatedColor = this.generateColor();
      let isColorUsed = false;
      for (const key in colorArray) {
        if (colorArray[key] === generatedColor) {
          isColorUsed = true;
          break;
        }
      }
      if (!isColorUsed) {
        colorArray[this.props.name] = generatedColor;
      }
    }
    return (
      <span style={{ width: this.props.duration * 15, left: this.props.timeToStart * 15, background: colorArray[this.props.name] }} className="taskBox">

        {this.props.name}
        :
        {this.props.duration}

      </span>

    );
  }
}
TaskInMachineView.propTypes = {
  name: PropTypes.string.isRequired,
  timeToStart: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export default TaskInMachineView;
