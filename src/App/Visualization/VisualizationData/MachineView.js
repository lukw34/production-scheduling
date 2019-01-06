import React from 'react';
import TaskInMachineView from './TaskInMachineView';
import './machineView.css';

class MachineView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            taskInMachineList: props.taskInMachineList
        }
    }
    render() {
        const taskList = this.state.taskInMachineList.map((task) =>
            <TaskInMachineView name={task.name} timeStart={task.timeStart} duration={task.duration} />);

        return (
            <div>
                Name = {this.state.name}<br />
                {taskList}
            </div>
        );

    }
}

export default MachineView;