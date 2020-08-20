import React from "react";
import { faPlay as fasFaPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TimelineToggle extends React.Component {
    forceUpdateHandler() {
        window.location.reload();
    }

    /* constructor(props) {
       super(props);
       this.timelineHiddenToggle = this.timelineHiddenToggle.bind(this);
       this.servicesHiddenToggle = this.servicesHiddenToggle.bind(this);
       this.messagesHiddenToggle = this.messagesHiddenToggle.bind(this);
     }
   
     timelineHiddenToggle() {
       this.setState({ isHidden: false });
     }
   
     servicesHiddenToggle() {
       this.setState({ isHidden: true });
     }
   
     messagesHiddenToggle() {
       this.setState({ isHidden: true });
     }*/

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="loggedInHeader">
                <span>
                    <a
                        href="#messages"
                        onClick={this.forceUpdateHandler} /*onClick={
              this.messagesHiddenToggle
            }
            tabIndex="1"*/>
                        Messages
          </a>
                    <FontAwesomeIcon icon={fasFaPlay} id="downIcon" />
                </span>
                <span>
                    <a
                        href="#timeline"
                        onClick={this.forceUpdateHandler} /*onClick={
              this.timelineHiddenToggle
            }
            tabIndex="2"*/>
                        Timeline
          </a>
                    <FontAwesomeIcon icon={fasFaPlay} id="downIcon" />
                </span>
                <span>
                    <a
                        href="#services"
                        onClick={this.forceUpdateHandler} /*onClick={
              this.servicesHiddenToggle
            }
            tabIndex="3"*/
                        style={{ borderRightWidth: "0.2vw" }}>
                        Services
          </a>
                    <FontAwesomeIcon icon={fasFaPlay} id="downIcon" />
                </span>
            </div>
        );
    }
}

export default TimelineToggle;
