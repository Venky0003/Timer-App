import React from 'react';
// import Time from './Time'
import Stopwatch from './Stopwacth';
import Countdown from './Countdown';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatch: false,
      countdown: false,
    };
  }

  handleClose = (key) => {
    this.setState({ [key]: false });
  };

  render() {
    return (
      <div className='container m-top-80 text-center'>
        <h1 className='main-header'>Timers</h1>
        <div className='flex justify-center m-top-25'>
        {this.state.stopwatch ? (
          <Stopwatch handleClose={this.handleClose} />
        ) : (
          <button className='btn' onClick={() => this.setState({ stopwatch: true })}>
            Show StopWatch
          </button>
        )}

        {this.state.countdown ? (
          <Countdown handleClose={this.handleClose} />
        ) : (
          <button className='btn' onClick={() => this.setState({ countdown: true })}>
           Show Countdown
          </button>
        )}
        </div>
      </div>
    );
  }
}

export default App;
