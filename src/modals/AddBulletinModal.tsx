import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useModal } from "../context/ModalContext";


const StyledButton = styled.button`
  background: ${theme.colors.blue};
  color: ${theme.colors.white};
  border: none;
  outline: none;
  padding: 5px 10px;
  border-radius: 5px;
  &:hover {
    background: ${theme.colors.lightBlue};
    cursor: pointer;
  }
`;

const AddBulletinModal: React.FC<{}> = () => {

  const { setActiveModal } = useModal();

  const bulletinSchema = Yup.object().shape({
    subject: Yup.string().required("You must include a subject."),
    message: Yup.string().required("You must include a message."),
    isPrivate: Yup.string(),
    date: Yup.string(),
    agencyId: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        subject: "",
        message: "",
        isPrivate: "false",
        date: "",
        agencyId: "",
      }}

      // TO DO: Update for AddBulletin action

      validationSchema={bulletinSchema}
      onSubmit={async (values) => {
        console.log({ values });
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledFormikField name="subject" label="Subject Line" />
          <StyledFormikField
            name="message"
            label="Message"
            type="textarea"
          />
          <input type="checkbox" />
          <p>Make this bulletin private (only those with access to your agency can view this message).</p>
          <StyledButton type="submit">Submit</StyledButton>
        </Form>
      )}
    </Formik>
  );
};
export default AddBulletinModal;
