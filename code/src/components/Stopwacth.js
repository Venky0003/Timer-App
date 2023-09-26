import React from 'react';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };
    this.timer = null;
  }

  handleTimerOn = () => {
    this.setState({ timerOn: !this.state.timerOn });
  };

  handleStartTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({ timerTime: Date.now() - this.state.timerStart });
      // console.log('hello timer');
    }, 10);
  };

  handleStopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleResetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };
  render() {
    const { timerTime } = this.state;
    let milliSeconds = ('0' + (Math.floor(timerTime) % 1000)).slice(-3);
    let centiSeconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + Math.floor(timerTime / 360000)).slice(-2);
    return (
      <div className='box'>
        <span className='close' onClick={() => this.props.handleClose('stopwatch')}>X</span>
        <h2 className='sub-heading'>Stopwacth</h2>
        <div className='timer'>
          {hours} : {minutes} : {seconds} : {centiSeconds} : {milliSeconds}
        </div>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button className='btn-primary' onClick={this.handleStartTimer}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button  className='btn-primary' onClick={this.handleStopTimer}>Stop</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button  className='btn-primary m-right-15' onClick={this.handleStartTimer}>Resume</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button  className='btn-primary' onClick={this.handleResetTimer}>Reset</button>
        )}
      </div>
    );
  }
}

export default Stopwatch;


