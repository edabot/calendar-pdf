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
      weekCount: moment().format('dddd') === "Sunday" ? 6 : 5
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
    this.setState({
      startDate: newStartDate,
      weekCount: newStartDate.format('dddd') === "Sunday" ? 6 : 5
    })
    console.log(newStartDate.format('dddd'))
  }

  subtractDay() {
    let newStartDate = moment(this.state.startDate).subtract(1, 'days')
    this.setState({
      startDate: newStartDate,
      weekCount: newStartDate.format('dddd') === "Sunday" ? 6 : 5
    })
    console.log(newStartDate.format('dddd'))
  }

  render() {
    console.log(this.state.startDate)
    return (
      <div className="App">
        <div onClick={this.addDay.bind(this)}>+1 day</div>
        <div onClick={this.subtractDay.bind(this)}>-1 day</div>

        <div id="divToPDF">
          hi
          <Calendar startDate={this.state.startDate} weekCount={this.state.weekCount}/>
        </div>
        <div onClick={this.printPdf}>print</div>
      </div>
    );
  }
}

export default App;
