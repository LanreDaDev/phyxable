import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import useViewport from "./useViewPort";

function WeekView(props) {
  const [weekHeaderDisplay, setWeekHeaderDisplay] = useState({});
  const [notCurrent, setNotCurrent] = useState(false);

  const AVAILABLETIME = [
    "9:00am",
    "9:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "1:00pm",
    "1:30pm",
    "2:00pm",
  ];

  useEffect(() => {
    if (props.weekOf.length > 0 && props.currentDay) {
      setWeekHeaderDisplay({
        year: format(props.currentDay, "yyyy"),
        month: format(props.currentDay, "MMMM"),
        weekStart: format(props.weekOf[0], "d"),
        weekEnd: format(props.weekOf[props.weekOf.length - 1], "d"),
      });
    }
  }, [props.weekOf]);

  useEffect(() => {
    if (props.mobileView) {
      props.onSetWeekOf(
        eachDayOfInterval({
          start: props.currentDay,
          end: addDays(props.currentDay, 2),
        })
      );
    } else if (props.tabletView) {
      props.onSetWeekOf(
        eachDayOfInterval({
          start: props.currentDay,
          end: addDays(props.currentDay, 3),
        })
      );
    } else {
      props.onSetWeekOf(
        eachDayOfInterval({
          start: startOfWeek(props.currentDay),
          end: endOfWeek(props.currentDay),
        })
      );
    }
  }, [props.mobileView, props.tabletView]);

  useEffect(() => {
    if (notCurrent) {
      if (props.mobileView) {
        props.onSetWeekOf(
          eachDayOfInterval({
            start: props.currentDay,
            end: addDays(props.currentDay, 2),
          })
        );
      } else if (props.tabletView) {
        props.onSetWeekOf(
          eachDayOfInterval({
            start: props.currentDay,
            end: addDays(props.currentDay, 3),
          })
        );
      } else {
        props.onSetWeekOf(
          eachDayOfInterval({
            start: startOfWeek(props.currentDay),
            end: endOfWeek(props.currentDay),
          })
        );
      }
    }
    const result = props.weekOf.filter(
      (element) =>
        format(element, "MM/dd/yyyy") === format(props.currentDay, "MM/dd/yyyy")
    );

    if (result.length > 0) {
      setNotCurrent(false);
    } else {
      setNotCurrent(true);
    }
  }, [props.currentDay]);

  useEffect(() => {
    if (notCurrent) {
      if (props.mobileView) {
        props.onSetWeekOf(
          eachDayOfInterval({
            start: props.currentDay,
            end: addDays(props.currentDay, 2),
          })
        );
      } else if (props.tabletView) {
        props.onSetWeekOf(
          eachDayOfInterval({
            start: props.currentDay,
            end: addDays(props.currentDay, 3),
          })
        );
      } else {
        props.onSetWeekOf(
          eachDayOfInterval({
            start: startOfWeek(props.currentDay),
            end: endOfWeek(props.currentDay),
          })
        );
      }
    }
  }, [notCurrent]);

  const timeClick = (timeStart, timeEnd) => {
    var time = { start: timeStart, end: timeEnd };
    props.onSetModalStatus(true);
    props.onSetCurrentTime(time);
  };

  const nextDay = () => {
    props.onSetCurrentDay(addDays(props.currentDay, 1));
  };

  const prevDay = () => {
    props.onSetCurrentDay(subDays(props.currentDay, 1));
  };

  return (
    <Row style={{ padding: 1.5 + `em ` + 0 }}>
      <Col span={24}>
        {props.currentDay ? (
          <Row justify="space-between" align="middle">
            <Col
              style={{
                color: "#2A2E35",
                fontWeight: "bold",
                fontSize: props.mobileView ? 12 + `px` : 14 + `px`,
                fontFamily: "Montserrat, sans-serif",
                paddingBottom: 1.65 + `em`,
              }}
            >
              <span>{weekHeaderDisplay.month}</span>{" "}
              <span>{weekHeaderDisplay.weekStart}</span> -{" "}
              <span>{weekHeaderDisplay.weekEnd}</span>,{" "}
              <span>{weekHeaderDisplay.year}</span>
            </Col>{" "}
            <Col>
              <div
                className={props.mobileView ? "icon mobileIcon" : "icon"}
                onClick={prevDay}
              >
                chevron_left
              </div>
              <div
                className={props.mobileView ? "icon mobileIcon" : "icon"}
                onClick={nextDay}
              >
                chevron_right
              </div>
              {/* <Button onClick={prevDay}>prev</Button> {"     "}{" "}
              <Button onClick={nextDay}>next</Button>{" "} */}
            </Col>
          </Row>
        ) : null}
      </Col>
      <Col span={24}>
        <Row
          justify="space-between"
          style={{
            background: "#F5F7FA",
            borderRadius: 6 + `px`,
            // marginTop: 10,
          }}
        >
          {props.weekOf && props.currentDay
            ? props.weekOf.map((day, i) => (
                <Col
                  onClick={() => {
                    props.onSetCurrentDay(day);
                  }}
                  key={day}
                  style={{
                    background: i % 2 == 0 ? null : "#eff2f7",

                    borderWidth: 1 + `px`,
                    borderColor:
                      format(props.currentDay, "MM/dd/yyyy") ===
                      format(day, "MM/dd/yyyy")
                        ? "#FF5A66"
                        : "",
                    borderStyle:
                      format(props.currentDay, "MM/dd/yyyy") ===
                      format(day, "MM/dd/yyyy")
                        ? "solid"
                        : "none",
                  }}
                  className={
                    props.mobileView
                      ? "mobileCell"
                      : props.tabletView
                      ? "tabletCell"
                      : "weekCell"
                  }
                >
                  <Row align="middle">
                    <Col style={{ marginRight: 2 }}>
                      <span
                        style={{
                          color: "#18214D",
                          opacity: 0.6,
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: 10 + `px`,
                        }}
                      >
                        {format(day, "EE")}
                      </span>
                    </Col>
                    <Col>
                      {format(props.currentDay, "MM/dd/yyyy") ===
                      format(day, "MM/dd/yyyy") ? (
                        <span
                          style={{
                            position: "absolute",
                            width: 30 + `px`,
                            height: 7 + `px`,
                            background: "#FF5A66",
                            borderRadius: 2 + `px`,
                            fontSize: 5 + `px`,
                            textAlign: "center",
                            textTransform: "uppercase",
                            color: "#fff",
                          }}
                        >
                          Today
                        </span>
                      ) : null}
                    </Col>
                  </Row>

                  <p
                    style={{
                      color:
                        format(props.currentDay, "MM/dd/yyyy") ===
                        format(day, "MM/dd/yyyy")
                          ? null
                          : "#18214D",
                      fontSize: 28 + `px`,
                      fontWeight: 600,
                    }}
                  >
                    {format(day, "d")}
                  </p>
                  <Row gutter={[0, 8]} justify="center" style={{}}>
                    {props.weekOf && props.currentDay
                      ? AVAILABLETIME.map((time, i) => (
                          <Col span={24} key={time}>
                            <button
                              disabled={
                                props.apts[
                                  format(day, "dd/MMMM/yyyy") + " " + time
                                ]
                                  ? true
                                  : false
                              }
                              className={
                                props.apts[
                                  format(day, "dd/MMMM/yyyy") + " " + time
                                ]
                                  ? "timeButtonsSelected"
                                  : "timeButtons"
                              }
                              onClick={() => {
                                if (i != AVAILABLETIME.length - 1) {
                                  timeClick(time, AVAILABLETIME[i + 1]);
                                } else {
                                  timeClick(time, "2:30pm");
                                }

                                // props.onSetCurrentTime(time);
                              }}
                            >
                              {time}
                            </button>
                          </Col>
                        ))
                      : null}
                  </Row>
                </Col>
              ))
            : null}
        </Row>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state, props) => ({
  weekOf: state.weekOfReducer.weekOf ? state.weekOfReducer.weekOf : [],
  currentDay: state.currentDayReducer.currentDay
    ? state.currentDayReducer.currentDay
    : new Date(),
  apts: state.aptsReducer.apts ? state.aptsReducer.apts : {},
});

const mapDispatchToProps = (dispatch) => ({
  onSetWeekOf: (data) => dispatch({ type: "WEEK_OF_SET", data }),
  onSetCurrentDay: (data) => dispatch({ type: "CURRENT_DAY_SET", data }),
  onSetModalStatus: (data) => dispatch({ type: "MODAL_STATUS_SET", data }),
  onSetCurrentTime: (data) => dispatch({ type: "CURRENT_TIME_SET", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekView);
