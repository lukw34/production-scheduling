import React from 'react';
import PropTypes from 'prop-types';
import '../VisualizationView/TaskInMachineView.css';

class TaskInMachineView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   key: props.key,
      name: props.name,
      startTime: props.timeStart,
      duration: props.duration,
      generatedColor: props.generatedColor
    };
  }

  render() {
    return (


      <span style={{ width: this.state.duration, left: this.state.startTime, background: this.state.generatedColor }} className="taskBox">{this.state.name}</span>

    );
  }
}
TaskInMachineView.propTypes = {
  name: PropTypes.string.isRequired,
  timeStart: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

export default TaskInMachineView;
