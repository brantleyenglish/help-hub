import { Form, Formik } from "formik";
import React from "react";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import * as Yup from "yup";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useModal } from "../context/ModalContext";
import { updateMessage } from "../firebase/messages";

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

const StyledFormikFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  color: ${theme.colors.gray};
  label {
    color: ${theme.colors.lightBlue};
    text-align: left;
  }
  input,
  textarea,
  select {
    border-radius: 4px;
    padding: 5px;
    border: none;
    margin-top: 5px;
    background: ${theme.colors.grayLight};
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
  const { setActiveModal } = useModal();
  const { refreshMessages } = usePublicData();
  const { getAgencyMessagesCallback } = useAgency();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const bulletinSchema = Yup.object().shape({
    subject: Yup.string().required("You must include a subject."),
    message: Yup.string().required("You must include a message."),
  });

  return (
    <Formik
      initialValues={{
        subject: message?.subject || "",
        message: message?.message || "",
      }}
      validationSchema={bulletinSchema}
      onSubmit={async (values) => {
        if (message) {
          await updateMessage({
            data: {
              ...message,
              ...values,
              isPrivate,
            },
          });
          if (getAgencyMessagesCallback) {
            await getAgencyMessagesCallback();
          }
          if (refreshMessages) {
            await refreshMessages();
          }
        }
        setActiveModal("");
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <StyledFormikField name="subject" label="Subject Line" />
          <StyledFormikField name="message" label="Message" type="textarea" />
          <StyledFormikFieldWrapper>
            <label htmlFor="isPrivate">
              Make this bulletin private (only those with access to your agency
              can view this message).
            </label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => toggleIsPrivate()}
            />
          </StyledFormikFieldWrapper>
          <StyledButton type="submit">Submit</StyledButton>
        </Form>
      )}
    </Formik>
  );
};

export default EditBulletinModal;
