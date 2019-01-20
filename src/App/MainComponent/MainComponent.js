import React from 'react';
import ParametersBox from '../MainPage/ParametersBox';
import Visualization from '../Visualization/VisualizationData/Visualization';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <ParametersBox />
        <Visualization/>
      </div>
    );
  }
}

export default MainComponent;