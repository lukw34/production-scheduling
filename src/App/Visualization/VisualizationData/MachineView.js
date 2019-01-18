import React from 'react';
import PropTypes from 'prop-types';
import TaskInMachineView from './TaskInMachineView';
import '../VisualizationView/MachineView.css';

class MachineView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      taskInMachineList: props.taskInMachineList
    };
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const taskList = this.state.taskInMachineList.map(task => <TaskInMachineView name={task.name} timeStart={task.timeStart} duration={task.duration} generatedColor={task.generatedColor} />);


    return (
      <div className="boxMachine">
        <div className="machineView">
          <h1 className="machineTitle">
            {this.state.name}
          </h1>
          <div className="allTaskBox">{taskList}</div>
        </div>


      </div>
    );
  }
}
MachineView.propTypes = {
  taskInMachineList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
export default MachineView;