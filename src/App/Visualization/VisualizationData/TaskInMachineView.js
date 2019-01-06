import React from 'react';

class TaskInMachineView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            startTime: props.timeStart,
            duration: props.duration
        }
    }

    render() {
        return (
            <div>
                Name = {this.state.name}, startTime = {this.state.startTime}, duration = {this.state.duration}<br />
            </div>
        );

    }

}

export default TaskInMachineView;