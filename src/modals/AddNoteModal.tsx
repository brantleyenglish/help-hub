import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";

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

const AddBulletinModal: React.FC<{}> = () => {
  const { setActiveModal } = useModal();
  const { agency } = useAgency();
  const { updateClientInfo, clientProfile, getClientProfile } = useClient();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const bulletinSchema = Yup.object().shape({
    subject: Yup.string()
      .required("You must include a subject.")
      .max(500, "Keep the subject under 500 characters."),
    message: Yup.string()
      .required("You must include a message.")
      .max(2000, "Keep the message under 2000 characters."),

  });

  return (
    <>
      <StyledHeader>
        <h2>Add a Note</h2>
        <p>
          Write a note about {clientProfile?.clientFirstName}{" "}
          {clientProfile?.clientLastName}.{" "}
        </p>
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
          if (updateClientInfo && clientProfile?.id) {
            await updateClientInfo(
              clientProfile?.notes
                ? {
                  clientId: clientProfile?.id,
                  newData: {
                    notes: [
                      ...clientProfile?.notes,
                      {
                        ...values,
                        isPrivate,
                        agencyId: agency?.id,
                        agencyName: agency?.name,
                        date: `${month} / ${date} / ${newDate?.getFullYear()}`,
                      },
                    ],
                  },
                }
                : {
                  clientId: clientProfile?.id,
                  newData: {
                    notes: [
                      {
                        ...values,
                        isPrivate,
                        agencyId: agency?.id,
                        agencyName: agency?.name,
                        date: `${month} / ${date} / ${newDate?.getFullYear()}`,
                      },
                    ],
                  },
                }
            );
          }
          if (clientProfile?.id && getClientProfile) {
            getClientProfile({ clientId: clientProfile?.id });
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
                Make this note private (only those with access to your client
                can view this message).
              </label>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={() => toggleIsPrivate()}
              />
            </StyledFormikFieldWrapper>

            {/* <p>Make this bulletin private (only those with access to your client can view this message).</p> */}
            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddBulletinModal;
