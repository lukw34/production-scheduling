import React from 'react';
import PropTypes from 'prop-types';
import MachineView from './MachineView';
import '../VisualizationView/visualization.css';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machineList: props.machineList
    };
  }


  render() {

    const machineList = this.props.machineList.data.map(machine => (<MachineView key={machine.toString()} name={machine.name} taskInMachineList={machine.taskInMachineList} />));
    return (
      <div className="boxVisualization">
        <p>
          Execution time: &nbsp;
          {this.props.machineList.executionTime}
        </p>


        {machineList}
      </div>
    );
  }
}

Visualization.propTypes = {
  machineList: PropTypes.array.isRequired
};

export default Visualization;