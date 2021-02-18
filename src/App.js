import React, { Component } from 'react';
import './App.css'

class App extends Component {

    state = {
        timer: null,
        hours: '00',
        minuts: '00',
        seconds: '00',
        startDisabled: false,
        stopDisabled: true
    }

    constructor(props) {
        super(props);
        
        this.onPageLoad = this.onPageLoad.bind(this);
        this.onButtonStart = this.onButtonStart.bind(this);
        this.onButtonStop = this.onButtonStop.bind(this);
        this.onButtonWait = this.onButtonWait.bind(this);
        this.onButtonReset = this.onButtonReset.bind(this);
        this.start = this.start.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.seconds) + 1).toString(),
                count = this.state.minuts,
                hour = this.state.hours;

            if (Number(this.state.seconds) === 99) {
                count = (Number(this.state.minuts) + 1).toString();
                num = '00';
            }
            if (Number(this.state.minuts) === 59) {
                hour = (Number(this.state.hours) + 1).toString();
                count = '00';
            }

            self.setState({
                hours: hour.length === 1 ? '0' + hour : hour,
                minuts: count.length === 1 ? '0' + count : count,
                seconds: num.length === 1 ? '0' + num : num
            });
        }, 0);
        this.setState({ timer });
    }

    onPageLoad() {
        this.start();
        this.setState({ startDisabled: true, stopDisabled: false });
    }

    
    onButtonStart() {
        this.start();
        this.setState({ startDisabled: true, stopDisabled: false });
    }


    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({ startDisabled: false, stopDisabled: true });
        this.setState({
            timer: null,
            hours: '00',
            minuts: '00',
            seconds: '00'
        });
    }

    onButtonWait() {
        clearInterval(this.state.timer);
        this.setState({ startDisabled: false, stopDisabled: true });
    }


    onButtonReset() {
        this.setState({
            timer: null,
            hours: '00',
            minuts: '00',
            seconds: '00'
        });
    }

    render() {
        return (
          <div className = "stopwatch">
            <div className = "stopwatch-num">
                {this.state.hours}:
                {this.state.minuts}:
                {this.state.seconds}
            </div>
           
            <div className = "stopwatch-btn-all">
            <button className = "stopwatch-btn" title="Start" onClick = {this.onButtonStart} disabled = {this.state.startDisabled}>Start</button>
            <button className = "stopwatch-btn" title="Stop" onClick = {this.onButtonStop} disabled = {this.state.stopDisabled}>Stop</button>
            <button className = "stopwatch-btn" title="Wait" onDoubleClick = {this.onButtonWait} disabled = {this.state.stopDisabled}>Wait</button>
            </div>
            <div className = "stopwatch-btn-all">
            <button className = "stopwatch-btn-reset" title="Reset" onClick = {this.onButtonReset}>Reset</button>
            </div>
          </div> 
        );
    }
}

export default App;