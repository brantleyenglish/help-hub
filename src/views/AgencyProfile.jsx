import React from "react";
import AgencyInfo from "../components/agencyLoggedIn/agencyInfo";
import Messages from "../components/agencyLoggedIn/messages";
import ServiceMod from "../components/agencyLoggedIn/services";
import TimelineMod from "../components/clientProfile/clientAssistanceModal";
import TimelineToggle from "../components/agencyLoggedIn/timelineToggle.js";

import { getAgency } from "../firebase/agencies";

import { useAgency } from "../context/AgencyContext";
import { useAuth } from "../context/AuthContext";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { signup } from "../firebase/auth";

const AgencyProfile = ({ match }) => {
  const { agencyId } = match.params;
  const { agency, updateAgencyInfo } = useAgency();

  const { user } = useAuth();

  const [agencyProfile, setAgencyProfile] = React.useState(null);

  const [error, setError] = React.useState("");

  const agencySchema = Yup.object().shape({
    contactFirstName: Yup.string().required("Contact name required"),
    contactLastName: Yup.string().required("Contact name required"),
    city: Yup.string().required("City required"),
    description: Yup.string().required("Agency description required"),
    name: Yup.string().required("Agency name can not be empty"),
    phone: Yup.string().required("This email address is not valid"),
    streetAddress: Yup.string().required("This email address is not valid"),
    website: Yup.string().required("This email address is not valid"),
    zip: Yup.string().required("This email address is not valid"),
  });

  const getAgencyProfile = async () => {
    const agencyData = await getAgency({ agencyId });
    setAgencyProfile(agencyData);
  };

  React.useEffect(() => {
    getAgencyProfile();
  }, []);

  React.useEffect(() => {
    console.log({ agencyProfile, agency });
  }, [agencyProfile]);

  if (user?.uid === agencyId) {
    return (
      <Formik
        initialValues={{
          contactFirstName: "",
          contactLastName: "",
          city: "",
          description: "",
          name: "",
          phone: "",
          streetAddress: "",
          website: "",
          zip: "",
        }}
        validationSchema={agencySchema}
        onSubmit={async (values) => {
          await updateAgencyInfo({
            agencyId: agencyProfile?.id,
            newData: values,
          });
          console.log("made it");
        }}
      >
        <Form>
          <h1>{agency?.name}</h1>
          <p>Update agency contact info!</p>
          <label htmlFor="name">Agency Name</label>
          <Field name="name" id="name" />
          <ErrorMessage name="name" />

          <label htmlFor="contactFirstName">Contact First name</label>
          <Field name="contactFirstName" id="contactFirstName" />
          <ErrorMessage name="contactFirstName" />

          <label htmlFor="contactLastName">Contact Last name</label>
          <Field name="contactLastName" id="contactLastName" />
          <ErrorMessage name="contactLastName" />

          <label htmlFor="city">City</label>
          <Field name="city" id="city" />
          <ErrorMessage name="city" />

          <label htmlFor="description">Description</label>
          <Field name="description" id="description" />
          <ErrorMessage name="description" />

          <label htmlFor="phone">Phone #</label>
          <Field name="phone" id="phone" />
          <ErrorMessage name="phone" />

          <label htmlFor="streetAddress">Street Address</label>
          <Field name="streetAddress" id="streetAddress" />
          <ErrorMessage name="streetAddress" />

          <label htmlFor="website">Website</label>
          <Field name="website" id="website" />
          <ErrorMessage name="website" />

          <label htmlFor="zip">Zip Code</label>
          <Field name="zip" id="zip" />
          <ErrorMessage name="zip" />

          <button type="submit">Submit</button>
          {error && <p>{error}</p>}
        </Form>
      </Formik>
    );
  }

  return <h1>Not me</h1>;

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
