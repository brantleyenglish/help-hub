import React from "react";
import TimelineMod from "./clientAssistanceModal";
import ClientAddButtons from "./clientAddButtons";

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timeline: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }] };
    }
    render() {
        return (
            <div className="timeline">
                <ClientAddButtons />
                <div className="bigTime">
                    {this.state.timeline.map(timeline => (
                        <TimelineMod key={timeline.id} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Timeline;
