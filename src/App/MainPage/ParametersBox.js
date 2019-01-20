import React from 'react';
import './StyleMainPage/ParametersBox.css';
import Button from './Button';
// import Text from './Text';
import Input from './Input';
import { tabuSearch, simulatedAnnealing } from '../../utils/getJSSSolution';
import Visualization from '../Visualization/VisualizationData/Visualization';

class ParametersBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machineCount: '2',
      jobsCount: '4',
      showOption: 'tabuSearch',
      tabuSize: '40',
      maxIteration: '30',
      maxIterationWithoutImprovement: '20',
      initialTemp: '100',
      coolingRate: '0.03',
      minTemp: '1',
      solution: '',
      generatedData: null
    };
    this.handleMachineChange = this.handleMachineChange.bind(this);
    this.handleJobsChange = this.handleJobsChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleTabuSizeChange = this.handleTabuSizeChange.bind(this);
    this.handleMaxIterationChange = this.handleMaxIterationChange.bind(this);
    this.handleMaxIterationWithoutImprovementChange = this.handleMaxIterationWithoutImprovementChange.bind(this);
    this.handleInitialTempChange = this.handleInitialTempChange.bind(this);
    this.handleCoolingRateChange = this.handleCoolingRateChange.bind(this);
    this.handleMinTempChange = this.handleMinTempChange.bind(this);
    this.handleTabuSearchClick = this.handleTabuSearchClick.bind(this);
    this.handleSimulatedAnnealingClick = this.handleSimulatedAnnealingClick.bind(this);
    this.generateObject = this.generateObject.bind(this);
  }

  handleMachineChange(event) {
    this.setState({ machineCount: event.target.value });
  }

  handleJobsChange(event) {
    this.setState({ jobsCount: event.target.value });
  }

  handleTabuSizeChange(event) {
    this.setState({ tabuSize: event.target.value });
  }

  handleMaxIterationChange(event) {
    this.setState({ maxIteration: event.target.value });
  }

  handleMaxIterationWithoutImprovementChange(event) {
    this.setState({ maxIterationWithoutImprovement: event.target.value });
  }

  handleInitialTempChange(event) {
    this.setState({ initialTemp: event.target.value });
  }

  handleCoolingRateChange(event) {
    this.setState({ coolingRate: event.target.value });
  }

  handleMinTempChange(event) {
    this.setState({ minTemp: event.target.value });
  }

  drawCount(params) {
    return Math.floor((Math.random() * params) + 1);
  }

  generateObject() {
    const jobs = {};
    const jobsCount = this.state.jobsCount;
    for (let i = 1; i <= jobsCount; i++) {
      jobs[`job${i}`] = [];
      const drawCountMachineIntoJobs = this.state.machineCount;
      for (let j = 0; j < drawCountMachineIntoJobs; j++) {
        const drawTimeDurationJobsInMachine = this.drawCount(15);
        jobs[`job${i}`][j] = { machineId: `M${j}`, time: drawTimeDurationJobsInMachine };
      }
    }
    console.log(jobs)
    this.setState({ generatedData: jobs });
  }

  handleGenerate(event) {

    if (this.state.showOption === 'tabuSearch') {
      const tabuSearchSolution = tabuSearch(this.state.generatedData, {
        tabuSize: this.state.tabuSize,
        maxIteration: this.state.maxIteration,
        maxIterationWithoutImprovement: this.state.maxIterationWithoutImprovement
      });
      this.setState({ solution: tabuSearchSolution });
    } else if (this.state.showOption === 'simulatedAnnealing') {
      const simulatedAnnealingSolution = simulatedAnnealing(this.state.generatedData, {
        initialTemp: this.state.initialTemp,
        coolingRate: this.state.coolingRate,
        minTemp: this.state.minTemp
      });
      this.setState({ solution: simulatedAnnealingSolution });
    }
    console.log(this.state.solution);
    event.preventDefault();
  }

  handleTabuSearchClick() {
    this.setState({ showOption: 'tabuSearch' });
  }

  handleSimulatedAnnealingClick() {
    this.setState({ showOption: 'simulatedAnnealing' });
  }

  render() {
    let option;
    let visualization;
    if (this.state.showOption === 'tabuSearch') {
      option = (
        <div className="containerBox">
          <span>Tabu size:</span>
          <Input
            style={{ display: 'block' }}
            type="number"
            name="tabuSize"
            value={this.state.tabuSize}
            onChange={this.handleTabuSizeChange}
          />

          <span>Max iteration:</span>
          <Input
            style={{ display: 'block' }}
            type="number"
            name="maxIteration"
            value={this.state.maxIteration}
            onChange={this.handleMaxIterationChange}
          />


          <span>Max iteration without improvement</span>
          <Input
            style={{ display: 'block' }}
            type="number"
            name="maxIterationWithoutImprovement"
            value={this.state.maxIterationWithoutImprovement}
            onChange={this.handleMaxIterationWithoutImprovementChange}
          />

        </div>
      );
    } else {
      option = (
        <div className="containerBox">
          <span>Initial temperature:</span>
          <Input
            style={{ display: 'block' }}
            type="number"
            name="tabuSize"
            value={this.state.initialTemp}
            onChange={this.handleInitialTempChange}
          />

          <span>Cooling rate: </span>
          <Input
            style={{ display: 'block' }}
            type="number"
            name="maxIteration"
            value={this.state.coolingRate}
            onChange={this.handleCoolingRateChange}
          />


          <span>Minimum temperature</span>
          <Input
            style={{ display: 'block' }}
            type="number"
            name="maxIterationWithoutImprovement"
            value={this.state.minTemp}
            onChange={this.handleMinTempChange}
          />


        </div>
      );


    }
    // console.log(this.state.solution);
    if (this.state.solution) {

      visualization = <Visualization machineList={this.state.solution} />;
    }
    return (
      <div>
        <div className="borderDiv">
          <Button text="Tabu search" color="#ED8A3F" display="inline" onClick={this.handleTabuSearchClick} />
          <Button text="Simulated Annealing" color="#FFCC00" display="inline" onClick={this.handleSimulatedAnnealingClick} />

          <div className="containerBox">
            <span>Machine count:</span>
            <Input type="number" name="machine" value={this.state.machineCount} onChange={this.handleMachineChange} />
            <span>Jobs count:</span>
            <Input style={{ display: 'block' }} type="number" name="jobs" value={this.state.jobsCount} onChange={this.handleJobsChange} />
          </div>
          {option}
          <Button text="Generate" display="block" onClick={this.generateObject} />
          <Button text="Start algorithm" display="block" disabled={!this.state.generatedData} onClick={this.handleGenerate} />
        </div>
        {visualization}
      </div>
    );
  }
}

export default ParametersBox;