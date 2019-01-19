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

  // componentWillMount() {
  //   this.generateColor();
  // }

  // generateColor() {
  //   const renderColor = Math.random().toString(16).substr(-6);
  //   const hexColor = `#${renderColor}`;
  //   // this.setState({
  //   //   generatedColor: hexColor
  //   // });
  // }

  render() {
    const machineList = this.state.machineList.map((machine) => {
      console.log(machine);
      return (<MachineView key={machine.toString()} name={machine.name} taskInMachineList={machine.taskInMachineList} />);
    });
    console.log(this.state.machineList);
    return (
      <div className="boxVisualization">
        {machineList}
      </div>
    );
  }
}

Visualization.propTypes = {
  machineList: PropTypes.array.isRequired
};

export default Visualization;