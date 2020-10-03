import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Calendar.css";
import "./App.css";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import Calendar from "./Calendar";
import WeekView from "./WeekView";
import AptSetter from "./AptSetter";
import MascotSVG from "./MascotSVG";
import useViewport from "./useViewPort";

function App(props) {
  const [mobileView, setMobileView] = useState(false);
  const { width } = useViewport();
  const breakpoint = 769;
  useEffect(() => {
    if (width < breakpoint) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [width]);

  return (
    <div
      className="App"
      onClick={(e) => {
        if (props.modalStatus && e.target.id === "myModal") {
          props.onSetModalStatus(false);
        }
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: 32 + `px`,
          color: "#000",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          marginBottom: 40,
        }}
      >
        Appointment Booking
      </h1>
      <Row
        justify="space-between"
        className="mainContent"
        style={{ padding: 10 }}
        gutter={[48, 8]}
      >
        <Col span={mobileView ? 24 : 8} className="calendarCol">
          {" "}
          <MascotSVG />
          <Row style={{ marginTop: -80 }}>
            <Col span={24}>
              <Calendar mobileView={mobileView} />
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }} justify="center">
            <Col
              span={20}
              style={{
                textAlign: "center",
                fontSize: 16 + `px`,
                color: "#18214D",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              <h2 style={{ color: "#18214D" }}>Appointment Type </h2>
              <h2
                style={{
                  fontWeight: 600,
                  color: "#18214D",
                }}
              >
                {" "}
                Free Consultation
              </h2>{" "}
              <p style={{ color: "#18214D" }}>
                {" "}
                Please select an available time that works best for your
                schedule.
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={mobileView ? 24 : 16}>
          <WeekView mobileView={mobileView} />
        </Col>
      </Row>
      {mobileView ? (
        <Row justify="center" style={{ marginTop: 20, textAlign: "center" }}>
          <Col span={12}>
            <span className="available">Available</span>
          </Col>
          <Col span={12}>
            <span className="booked">Booked</span>
          </Col>
        </Row>
      ) : (
        <Row justify="space-between" style={{ marginTop: 20 }}>
          <Col span={20}></Col>
          <Col span={4}>
            <span className="available">Available</span>
            <span className="booked">Booked</span>
          </Col>
        </Row>
      )}
      <AptSetter modalStatus={props.modalStatus} mobileView={mobileView} />
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  modalStatus: state.modalStatusReducer.modalStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onSetModalStatus: (data) => dispatch({ type: "MODAL_STATUS_SET", data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
