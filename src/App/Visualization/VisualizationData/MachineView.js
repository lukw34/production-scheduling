import React from 'react';
import PropTypes from 'prop-types';
import TaskInMachineView from './TaskInMachineView';
import '../VisualizationView/MachineView.css';

class MachineView extends React.Component {


  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const taskList = this.props.taskInMachineList.map(task => <TaskInMachineView name={task.name} timeToStart={task.timeToStart} duration={task.duration} />);
    let duration = 0;
    for (const task in this.props.taskInMachineList) {
      if (typeof this.props.taskInMachineList[task].duration !== 'undefined') duration += this.props.taskInMachineList[task].duration;
    }


    return (

      <div className="machineView">
        <h1 className="machineTitle">
          {this.props.name}
          :
          {' '}
          {duration}
        </h1>
        <div className="allTaskBox">{taskList}</div>
      </div>


    );
  }
}
MachineView.propTypes = {
  taskInMachineList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
export default MachineView;