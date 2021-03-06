import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useModal } from "../context/ModalContext";
import { usePublicData } from "../context/PublicContext";
import { createMessage } from "../firebase/messages";

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
const StyledHeader = styled.div`
  color: ${theme.colors.blue};
  h2,
  p {
    margin: 0;
    padding: 0;
  }
`;

const AddBulletinModal: React.FC<{ agencyId: string }> = ({ agencyId }) => {
  const { setActiveModal } = useModal();
  const { refreshMessages } = usePublicData();
  const { getAgencyMessagesCallback } = useAgency();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const bulletinSchema = Yup.object().shape({
    subject: Yup.string().required("You must include a subject.")
      .max(500, "Keep the subject under 500 characters."),
    message: Yup.string().required("You must include a message.")
      .max(2000, "Keep the message under 20000 characters."),
  });

  return (
    <>
      <StyledHeader>
        <h2>Add Bulletin Board Message</h2>
        <p>Write a message for all other agencies. </p>
        <p>
          This will be visible to all agencies unless you mark it as private.{" "}
        </p>
      </StyledHeader>
      <Formik
        initialValues={{
          subject: "",
          message: "",
        }}
        validationSchema={bulletinSchema}
        onSubmit={async (values) => {
          const newDate = new Date();
          const month = ("0" + (newDate?.getMonth() + 1)).slice(-2);
          const date = ("0" + newDate?.getDate()).slice(-2);
          await createMessage({
            data: {
              ...values,
              isPrivate,
              agencyId,
              date: `${month} / ${date} / ${newDate?.getFullYear()}`,
            },
          });
          if (getAgencyMessagesCallback) {
            await getAgencyMessagesCallback();
          }
          if (refreshMessages) {
            await refreshMessages();
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
                Make this bulletin private (only those with access to your
                agency can view this message).
              </label>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={() => toggleIsPrivate()}
              />
            </StyledFormikFieldWrapper>

            {/* <p>Make this bulletin private (only those with access to your agency can view this message).</p> */}
            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddBulletinModal;
