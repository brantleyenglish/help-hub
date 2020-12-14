import { Form, Formik } from "formik";
import React from "react";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import * as Yup from "yup";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
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

type MessageType = {
  subject: string;
  message: string;
  agencyId: string;
  date: string;
  isPrivate: string;
};

const EditBulletinModal: React.FC<{
  message: MessageType | undefined;
}> = ({ message }) => {
  const { updateAgencyInfo } = useAgency();
  const { setActiveModal } = useModal();
  const { allPublicMessages } = usePublicData();

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
        subject: message?.subject || "",
        message: message?.message || "",
        isPrivate: message?.isPrivate || "",
        date: message?.date || "",
        agencyId: message?.agencyId || "",
      }}
      validationSchema={bulletinSchema}
      onSubmit={async (values) => {
        console.log({ values });
        if (updateAgencyInfo && message) {
          // await updateAgencyInfo({
          //     agencyId: message?.agencyId,
          //     newData: { id: message?.id, ...values },
          // });
          // getAgencyProfile();
          setActiveModal("");
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledFormikField name="subject" label="Subject Line" />
          <StyledFormikField name="message" label="Message" type="textarea" />
          <input type="checkbox" />
          <p>
            Make this bulletin private (only those with access to your agency
            can view this message).
          </p>
          <StyledButton type="submit">Submit</StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditBulletinModal;
