import React from "react";
import MachineView from './MachineView';

class Visualization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machineList: props.machineList
        }
    }
    render() {
        const machineList = this.state.machineList.map((machine) =>
            <MachineView name={machine.name} taskInMachineList={machine.taskInMachineList} />);

        return (
            <div>
                {machineList}
            </div>
        );

    }
}

export default Visualization;