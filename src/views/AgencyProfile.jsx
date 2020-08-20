import React from "react";
import Agency from "../components/agencyLoggedIn/agencyInfo";
import Messages from "../components/agencyLoggedIn/messages";
import ServiceMod from "../components/agencyLoggedIn/services";
import Header from "../components/agencyLoggedIn/serviceHeader";
import TimelineMod from "../components/clientProfile/clientAssistanceModal";
import LoggedInHeader from "../components/agencyLoggedIn/serviceHeaderLoggedIn.js";

import { getAgency } from "../firebase/agencies";

import { useAgency } from "../context/AgencyContext";

const AgencyProfile = ({ match }) => {
  const { agencyId } = match.params;
  const { agency } = useAgency();

  const [agencyProfile, setAgencyProfile] = React.useState(null);

  const getAgencyProfile = async () => {
    const agencyData = await getAgency({ agencyId });
    setAgencyProfile(agencyData);
  };

  React.useEffect(() => {
    getAgencyProfile();
  }, []);

  React.useEffect(() => {
    console.log({ agencyProfile });
  }, [agencyProfile]);

  return <></>;

  // logIn() {
  //   this.setState(state => ({
  //     isLoggedIn: !state.isLoggedIn
  //   }));

  //   this.setState(function (prevState) {
  //     return { clicked: !prevState.clicked };
  //   });
  // }

  // messages() {
  //   this.setState(state => ({
  //     messages: true
  //   }));
  // }

  // var messages = window.location.href.indexOf("#messages");
  // var timeline = window.location.href.indexOf("#timeline");
  // var services = window.location.href.indexOf("#services");

  // if (services > 1) {
  //   return (
  //     <div className="Agenciespg">
  //       {/* Agency Profile */}
  //       <Agency />

  //       {/* Login Button */}
  //       <button id="loginbtn" onClick={this.logIn}>
  //         {this.state.clicked ? "Logout" : "Login"}
  //       </button>

  //       {/* Logged In Header */}
  //       <div className="serv">
  //         <LoggedInHeader
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Header */}
  //         <Header
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Services */}
  //         <div className="serviceContainer">
  //           {this.state.services.map(services => (
  //             <ServiceMod
  //               key={services.id}
  //               isLoggedIn={this.state.isLoggedIn}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (timeline > 1) {
  //   return (
  //     <div className="Agenciespg">
  //       {/* Agency Profile */}
  //       <Agency />

  //       {/* Login Button */}
  //       <button id="loginbtn" onClick={this.logIn}>
  //         {this.state.clicked ? "Logout" : "Login"}
  //       </button>

  //       {/* Logged In Header */}
  //       <div className="serv">
  //         <LoggedInHeader
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Header */}
  //         <Header
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Timeline */}
  //         <div className="timelineContainer">
  //           {this.state.timeline.map(timeline => (
  //             <TimelineMod
  //               key={timeline.id}
  //               isLoggedIn={this.state.isLoggedIn}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // if (messages > 1) {
  //   return (
  //     <div className="Agenciespg">
  //       {/* Agency Profile */}
  //       <Agency />

  //       {/* Login Button */}
  //       <button id="loginbtn" onClick={this.logIn}>
  //         {this.state.clicked ? "Logout" : "Login"}
  //       </button>

  //       {/* Logged In Header */}
  //       <div className="serv">
  //         <LoggedInHeader
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Header */}
  //         <Header
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Timeline */}
  //         <div className="timelineContainer">
  //           {this.state.messages.map(messages => (
  //             <Messages
  //               key={messages.id}
  //               isLoggedIn={this.state.isLoggedIn}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="Agenciespg">
  //       {/* Agency Profile */}
  //       <Agency />

  //       {/* Login Button */}
  //       <button id="loginbtn" onClick={this.logIn}>
  //         {this.state.clicked ? "Logout" : "Login"}
  //       </button>

  //       {/* Logged In Header */}
  //       <div className="serv">
  //         <LoggedInHeader
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Header */}
  //         <Header
  //           isLoggedIn={this.state.isLoggedIn}
  //           show={this.state.isLoggedIn}
  //         />

  //         {/* Services */}
  //         <div className="serviceContainer">
  //           {this.state.services.map(services => (
  //             <ServiceMod
  //               key={services.id}
  //               isLoggedIn={this.state.isLoggedIn}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
};

export default AgencyProfile;
