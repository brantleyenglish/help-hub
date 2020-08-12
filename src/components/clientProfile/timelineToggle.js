import React from "react";
import Timeline from "../clientProfile/clientTimeline";
import Files from "../clientProfile/clientFiles";

class SmallHead extends React.Component {
    constructor(props) {
        super(props);
        this.timelineHiddenToggle = this.timelineHiddenToggle.bind(this);
        this.fileHiddenToggle = this.fileHiddenToggle.bind(this);
        this.state = {
            file: [{ id: 1 }, { id: 2 }],
            timeline: [{ id: 0 }, { id: 1 }]
        };
    }

    timelineHiddenToggle() {
        this.setState({ isHidden: false });
    }

    fileHiddenToggle() {
        this.setState({ isHidden: true });
    }

    render() {
        return (
            <div>
                <div className="smallHead">
                    <div
                        className="timebtn"
                        onClick={this.timelineHiddenToggle}
                        tabIndex="1"
                    >
                        <h2>
                            Timeline{" "}
                            <img
                                src="https://b.kisscc0.com/20180818/jxe/kisscc0-duck-mallard-silhouette-goose-architetto-papera-5b77ce738b2811.34626701153457829157.png"
                                alt="yellaGoose"
                                style={{ width: 20, height: 20 }}
                            />
                        </h2>
                    </div>
                    <div className="filebtn" onClick={this.fileHiddenToggle} tabIndex="2">
                        <h2>
                            <img
                                src="https://b.kisscc0.com/20180818/jxe/kisscc0-duck-mallard-silhouette-goose-architetto-papera-5b77ce738b2811.34626701153457829157.png"
                                alt="notherGoose"
                                style={{ width: 20, height: 20 }}
                            />
              Files
            </h2>
                    </div>
                </div>
                {!this.state.isHidden && <Timeline />}
                {this.state.isHidden && <Files />}
            </div>
        );
    }
}

export default SmallHead;
