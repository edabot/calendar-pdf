import React, { Component } from 'react';
import pdfConverter from 'jspdf';
import html2canvas from 'html2canvas';
import moment from 'moment';
import Calendar from './components/Calendar.react'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      endDate: moment().add(29, 'days'),
      weekCount: moment().format('dddd') === "Sunday" ? 6 : 5,
      goal: ""
    }
  }

  printPdf() {
    html2canvas(window.document.getElementById('divToPDF'), {scale: 1}).then(function(canvas) {
      var img=canvas.toDataURL("image/png");
      var doc = new pdfConverter('p', 'px', 'letter');
      doc.addImage(img,'JPEG',20,20);
      doc.save('test.pdf');
    })
  }

  addDay() {
    let newStartDate = moment(this.state.startDate).add(1, 'days')
    this.updateState(newStartDate)
  }

  subtractDay() {
    let newStartDate = moment(this.state.startDate).subtract(1, 'days')
    this.updateState(newStartDate)
  }

  updateState(newStartDate) {
    this.setState({
      startDate: newStartDate,
      endDate: moment(newStartDate).add(29, 'days'),
      weekCount: newStartDate.format('dddd') === "Saturday" ? 6 : 5
    })
  }

  updateGoal(event) {
    this.setState({ goal: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <div className="buttons">
          <div className="print-button" onClick={this.printPdf}>print</div>
          <div className="shift-button" onClick={this.subtractDay.bind(this)}>-1 day</div>
          <div className="shift-button" onClick={this.addDay.bind(this)}>+1 day</div>
        </div>
        <div className="goal-entry">
          My goal is to <input onChange={this.updateGoal.bind(this)} value={this.state.goal} /> for 30 days
        </div>
        <div className="pdf-container">
          <div id="divToPDF">
            <div className="goal">30 Day Goal: {this.state.goal}</div>
            <Calendar
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              weekCount={this.state.weekCount}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
