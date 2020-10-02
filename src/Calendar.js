import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
} from "date-fns";
import { connect } from "react-redux";

const Calendar = (props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log(props.weekOf);
    props.onSetWeekOf(
      eachDayOfInterval({
        start: startOfWeek(currentDate),
        end: endOfWeek(currentDate),
      })
    );
  }, []);

  const header = () => {
    const dateFormat = "MMMM yyyy";
    const nextMonth = () => {
      setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
      setCurrentDate(subMonths(currentDate, 1));
    };
    return (
      <div className="header  flex-middle" style={{ alignItems: "center" }}>
        <div className="column">
          <span
            style={{
              color: "#2A2E35",
              fontWeight: "bold",
              fontSize: 14 + `px`,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {format(currentDate, "MMMM")}
          </span>{" "}
          <span
            style={{
              color: "#2A2E35",
              fontWeight: "200",
              fontSize: 14 + `px`,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {format(currentDate, "yyyy")}
          </span>
        </div>
        <div className="column">
          <div className="navRow">
            <div className="column"></div>

            <div
              className="column"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {" "}
              <div className="icon" onClick={prevMonth}>
                chevron_left
              </div>
              <div className="icon" onClick={nextMonth}>
                chevron_right
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const daysOfWeek = () => {
    const dateFormat = "EE";
    const days = [];
    let startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className="column col-center "
          style={{ textAlign: "center", paddingBottom: 1 + `em` }}
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const onDateClick = (day) => {
    setSelectedDate(day);
    props.onSetCurrentDay(day);
    props.onSetWeekOf(
      eachDayOfInterval({
        start: startOfWeek(day),
        end: endOfWeek(day),
      })
    );
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <Col
            className={`column cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            style={{
              background: i % 2 === 0 ? null : "#eff2f7",
              maxWidth: 100 + `%`,
            }}
            onClick={() => onDateClick(cloneDay)}
          >
            {/* The Big Dot */}{" "}
            <span
              className="number"
              style={{
                color: !isSameMonth(day, monthStart) ? null : "#18214D",
                color:
                  format(day, "MM/dd/yyyy") ===
                  format(props.currentDay, "MM/dd/yyyy")
                    ? "#fff"
                    : null,
                zIndex: 3,
              }}
            >
              {formattedDate}
            </span>
            <div
              style={{
                width: 2.1 + `em`,
                height: 2.1 + `em`,
                borderRadius: 50 + `%`,
                backgroundColor:
                  format(day, "MM/dd/yyyy") ===
                  format(props.currentDay, "MM/dd/yyyy")
                    ? "#FF5A66"
                    : null,
                margin: "auto",
                transition: 0.15 + `s ease-out`,
              }}
            >
              {/* The Little Dot */}
              <div
                style={{
                  position: "absolute",

                  top: 1.95 + `em`,
                  right: 0,

                  left: 0,

                  width: 0.25 + `em`,
                  height: 0.25 + `em`,
                  borderRadius: 50 + `%`,
                  backgroundColor:
                    format(day, "MM/dd/yyyy") ===
                    format(props.currentDay, "MM/dd/yyyy")
                      ? "#fff"
                      : null,
                  margin: "auto",
                }}
              ></div>
            </div>
            {/* <span className="bg">{formattedDate}</span> */}
          </Col>
        );
        day = addDays(day, 1);
      }
      rows.push(<Row key={day}> {days} </Row>);
      days = [];
    }

    return (
      <Row className="body" justify="center">
        <Col
          span={24}
          style={{
            background: "#F5F7FA",
            borderRadius: 6 + `px`,
          }}
        >
          {rows}
        </Col>
      </Row>
    );
  };

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{daysOfWeek()}</div>
      <div>{cells()}</div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  weekOf: state.weekOfReducer.weekOf,
  currentDay: state.currentDayReducer.currentDay
    ? state.currentDayReducer.currentDay
    : new Date(),
});

const mapDispatchToProps = (dispatch) => ({
  onSetWeekOf: (data) => dispatch({ type: "WEEK_OF_SET", data }),
  onSetCurrentDay: (data) => dispatch({ type: "CURRENT_DAY_SET", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
