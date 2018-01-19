import React, { Component } from 'react';
import moment from 'moment';

const makeDayArray = (startDate, endDate, weekCount) => {
  let calStartDate = moment(startDate).startOf('week');
  let dayArray = []
  let counter = calStartDate.diff(startDate, 'days')
  for (let i = 0; i < weekCount * 7; i++ ) {
    let date = moment(calStartDate).add(i, 'days').format("M/D")
    counter++
    dayArray.push({ date: date, counter: counter })
  }
  return dayArray
}

class Day extends Component {

  render() {
    return (
      <div className="day">
        <div className="date">
          {this.props.day.date}
        </div>
        <div className="counter">
          {this.props.day.counter > 30 || this.props.day.counter < 1 ? "" : this.props.day.counter }
        </div>
      </div>
    )
  }
}

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dayArray: makeDayArray(this.props.startDate, this.props.endDate, this.props.weekCount)
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ dayArray: makeDayArray(newProps.startDate, newProps.endDate, newProps.weekCount) })
  }

  render() {
    return (
      <div className="calendar">
        {this.state.dayArray.map(day => <Day day={day} key={day.date}/>)}
      </div>
    )

  }
}

export default Calendar
