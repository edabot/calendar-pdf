import React, { Component } from 'react';
import logo from './logo.svg';
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
    html2canvas(window.document.getElementById('divToPDF')).then(function(canvas) {
      var img=canvas.toDataURL("image/png");
      var doc = new pdfConverter('p', 'px', 'letter');
      doc.addImage(img,'JPEG',20,20);
      doc.save('test.pdf');
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div id="divToPDF">
          <Calendar startDate={this.state.startDate} weekCount={this.state.weekCount}/>
          {this.state.weekCount}
        </div>
        <div onClick={this.printPdf}>print</div>
      </div>
    );
  }
}

export default App;
