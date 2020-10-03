import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { format } from "date-fns";
function AptSetter(props) {
  const [currentDayLoaded, setCurrentDayLoaded] = useState(false);
  useEffect(() => {
    if (props.currentDay && Object.keys(props.currentTime).length != 0) {
      setCurrentDayLoaded(true);
    }
  }, [props.currentDay, props.currentTime]);
  const makeAppointment = (e) => {
    e.preventDefault();
    props.onSetModalStatus(false);
    props.onSetApts({
      ...props.apts,
      [format(props.currentDay, "dd/MMMM/yyyy") +
      " " +
      props.currentTime.start]: true,
    });
  };
  return (
    <div
      id="myModal"
      className="modal"
      style={{
        display: props.modalStatus ? "block" : "none",
      }}
    >
      <div
        className="modal-content"
        style={{ width: props.mobileView ? 320 + `px` : null }}
      >
        <span
          className="close"
          onClick={() => {
            props.onSetModalStatus(false);
          }}
        >
          &times;
        </span>
        <Row
          justify="center"
          style={{
            marginTop: 40,
            textAlign: "center",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          <Col span={20}>
            <h1
              style={{
                fontSize: 42 + `px`,

                fontWeight: 600,
                color: "#07122A",
              }}
            >
              Appointment Details
            </h1>
            <p
              style={{
                fontSize: 24 + `px`,
                color: "#07122A",
                fontWeight: 600,
              }}
            >
              {currentDayLoaded
                ? format(props.currentDay, "EEEE, MMMM do yyyy")
                : null}
            </p>
            <p
              style={{
                fontSize: 24 + `px`,
                color: "#07122A",
              }}
            >
              {currentDayLoaded
                ? `${props.currentTime.start} - ${props.currentTime.end} `
                : null}{" "}
            </p>
            <p
              style={{ fontSize: 37 + `px`, color: "#18214D", fontWeight: 600 }}
            >
              Free Consultation -{" "}
              <span style={{ fontWeight: 300 }}>30mins</span>
            </p>
            <Row justify="center">
              <form style={{ width: 100 + `%` }}>
                <Col span={24}>
                  <Row justify="center">
                    <Col span={24}>
                      {" "}
                      <p
                        style={{
                          textAlign: "start",
                          fontWeight: 600,
                          fontSize: 19 + `px`,
                        }}
                      >
                        {" "}
                        Phone Number:
                      </p>
                    </Col>
                    <Col span={24}>
                      <input
                        placeholder="000-000-0000"
                        type="text"
                        style={{
                          width: 100 + `%`,
                          background: "#EFF2F6",
                          borderRadius: 8 + `px`,
                          borderStyle: "none",
                          padding: 15,
                          color: " #0B152D",
                          fontSize: 17 + `px`,
                        }}
                        name="phone"
                        id=""
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={24}>
                      <p
                        style={{
                          textAlign: "start",
                          textAlign: "start",
                          fontWeight: 600,
                          fontSize: 19 + `px`,
                          marginTop: 30,
                        }}
                      >
                        Reasons:
                      </p>
                    </Col>
                    <Col span={24}>
                      <textarea
                        name="reasons"
                        placeholder="Please share anything that will help the Practitioner prepare for your session."
                        style={{
                          width: 100 + `%`,
                          background: "#EFF2F6",
                          borderRadius: 8 + `px`,
                          borderStyle: "none",
                          padding: 15,
                          color: " #0B152D",
                          fontSize: 17 + `px`,
                        }}
                        id=""
                        cols="30"
                        rows="5"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col style={{ marginTop: 40 }}>
                  <button className="modalButton" onClick={makeAppointment}>
                    MAKE APPOINTMENT
                  </button>
                </Col>
              </form>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  currentDay: state.currentDayReducer.currentDay
    ? state.currentDayReducer.currentDay
    : 0,
  currentTime: state.currentTimeReducer.currentTime
    ? state.currentTimeReducer.currentTime
    : {},
  apts: state.aptsReducer.apts ? state.aptsReducer.apts : {},
});

const mapDispatchToProps = (dispatch) => ({
  onSetModalStatus: (data) => dispatch({ type: "MODAL_STATUS_SET", data }),
  onSetApts: (data) => dispatch({ type: "APTS_SET", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AptSetter);
