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
  let calStartDate = moment(startDate).startOf('week');
  let weeksArray = []
  for (let i = 0; i < weekCount; i++ ) {
    weeksArray.push(makeWeekArray(calStartDate.add(1, 'weeks')))
  }
  return weeksArray
}

class Day extends Component {
  render() {
    return (
      <div className="day">
        {this.props.day.format("M/D")}
      </div>
    )
  }
}


class Week extends Component {
  render() {
    return (
      <div className="week">
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

  componentWillReceiveProps(newProps) {
    this.setState({ weekArray: makeWeeksArray(newProps.startDate, newProps.weekCount) })
  }

  render() {
    return (
      <div className="calendar">
        {this.state.weekArray.map(week => <Week week={week} key={week[0].format("DDDo")}/>)}
      </div>
    )

  }
}

export default Calendar
