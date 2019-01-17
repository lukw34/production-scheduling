import React from 'react';
import './StyleMainPage/ParametersBox.css';
import Button from './Button';
// import Text from './Text';
import Input from './Input';

class ParametersBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machineCount: '2',
      jobsCount: '66'
    };
    this.handleMachineChange = this.handleMachineChange.bind(this);
    this.handleJobsChange = this.handleJobsChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
  }

  handleMachineChange(event) {
    this.setState({ machineCount: event.target.value });
  }

  handleJobsChange(event) {
    this.setState({ jobsCount: event.target.value });
  }


  drawCount(params) {
    return Math.floor((Math.random() * params) + 1);
  }

  generateObject() {
    const jobs = {};

    const jobsCount = this.state.jobsCount;
    for (let i = 1; i <= jobsCount; i++) {
      jobs[`job${i}`] = [];
      const drawCountMachineIntoJobs = this.drawCount(this.state.machineCount);
      for (let j = 0; j < drawCountMachineIntoJobs; j++) {
        const drawTimeDurationJobsInMachine = this.drawCount(500);
        jobs[`job${i}`][j] = { machineId: `M${j}`, time: drawTimeDurationJobsInMachine };
      }
    }
    console.log(jobs);
  }

  handleGenerate(event) {
    this.generateObject();
    event.preventDefault();
  }

  render() {
    return (
      <div className="borderDiv">
        <Button text="Symulowane wyżarzanie" color="#ED8A3F" dispaly="inline" />
        <Button text="Algorytm mrówkowy" color="#FFCC00" display="inline" />
        <form onSubmit={this.handleSubmit}>

          <p>Jobs count</p>
          <Input type="number" name="jobs" value={this.state.jobsCount} onChange={this.handleJobsChange} />

          <p>Machine count</p>
          <Input type="number" name="machine" value={this.state.machineCount} onChange={this.handleMachineChange} />
          {/* <input type="number" value={this.state.value} onChange={this.handleChange} /> */}
          <Button text="Generate" color="#AEBD38" display="block" handleClick={this.handleGenerate} />
        </form>
      </div>

    );
  }
}

export default ParametersBox;