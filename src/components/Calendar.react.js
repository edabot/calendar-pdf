import React, { Component } from 'react';
import moment from 'moment';

const makeWeekArray = (startDate) => {
  let weekArray = []
  for (let i = 0; i < 7; i++ ) {
    weekArray.push(moment(startDate).add(i, 'days'))
  }
  return weekArray
}

const makeWeeksArray = (startDate, weekCount) => {
  let calStartDate = startDate.startOf('week');
  let weeksArray = []
  for (let i = 0; i < weekCount; i++ ) {
    weeksArray.push(makeWeekArray(calStartDate.add(i, 'weeks')))
  }
  return weeksArray
}

class Day extends Component {
  render() {
    return (
      <div>
        {this.props.day.format("M/D")}
      </div>
    )
  }
}


class Week extends Component {
  render() {
    return (
      <div>
        {this.props.week.map(day => <Day day={day} key={day.format("DDD")}/>)}
      </div>
    )
  }
}

class Calendar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      weekArray: makeWeeksArray(this.props.startDate, this.props.weekCount)
    }
  }

  render() {
    console.log(this.state.weekArray)
    return (
      <div className="calendar">
        {this.state.weekArray.map(week => <Week week={week} key={week[0].format("DDDo")}/>)}
      </div>
    )

  }
}

export default Calendar
