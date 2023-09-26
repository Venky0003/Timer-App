import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    };

    this.timer = null;
  }

  handleStartTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerStart,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert('Countdown ended');
      }
    }, 10);
  };

  handleStopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  handleResetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  updateTime = (input) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      switch (input) {
        case 'incHours':
          return timerTime + 3600000;
        case 'decHours':
          return timerTime - 3600000;
        case 'incMinutes':
          return timerTime + 60000;
        case 'decMinutes':
          return timerTime - 60000;
        case 'incSeconds':
          return timerTime + 1000;
        case 'decSeconds':
          return timerTime - 1000;
        default:
          return;
      }
    }
  };

  addTimer = (input) => {
    const newTime = this.updateTime(input);
    this.setState({ timerTime: newTime });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ('0' + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ('0' + (Math.floor(timerTime / 3600000) % 60)).slice(-2);
    return (
      <div className="box">
        <span
          className="close"
          onClick={() => this.props.handleClose('countdown')}
        >
          X
        </span>
        <h2 className="sub-heading">Countdown</h2>
        <div className="text">Hours : Minutes : Seconds</div>
        <button
          className="btn-arrows"
          onClick={() => {
            this.addTimer('incHours');
          }}
        >
          ⬆
        </button>
        <button
          className="btn-arrows"
          onClick={() => {
            this.addTimer('incMinutes');
          }}
        >
          ⬆
        </button>
        <button
          className="btn-arrows"
          onClick={() => {
            this.addTimer('incSeconds');
          }}
        >
          ⬆
        </button>

        <div className="timer spacing fsize-timer">
          {hours} : {minutes} : {seconds}
        </div>

        <button
          className="btn-arrows"
          onClick={() => {
            this.addTimer('decHours');
          }}
        >
          ⬇
        </button>
        <button
          className="btn-arrows"
          onClick={() => {
            this.addTimer('decMinutes');
          }}
        >
          ⬇
        </button>
        <button
          className="btn-arrows"
          onClick={() => {
            this.addTimer('decSeconds');
          }}
        >
          ⬇
        </button>
        <div>
          {timerOn === false &&
            (timerStart === 0 || timerTime === timerStart) && (
              <button className="btn-primary" onClick={this.handleStartTimer}>
                Start
              </button>
            )}
          {timerOn === true && timerTime >= 1000 && (
            <button className="btn-primary" onClick={this.handleStopTimer}>
              Stop
            </button>
          )}
          {timerOn === false &&
            timerStart !== 0 &&
            timerStart !== timerTime &&
            timerTime !== 0 && (
              <button className="btn-primary" onClick={this.handleStartTimer}>
                Resume
              </button>
            )}

          {(timerOn === false || timerTime < 1000) &&
            timerStart !== timerTime &&
            timerStart > 0 && (
              <button className="btn-primary" onClick={this.handleResetTimer}>
                Reset
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default Countdown;
