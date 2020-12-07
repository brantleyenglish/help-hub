import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ClientType } from "../../DataTypes";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAuth } from "../context/AuthContext";
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
`;

const AddBulletinModal: React.FC<{
  clientProfile: ClientType | null;
  getClientProfile: () => void;
}> = ({ clientProfile, getClientProfile }) => {
  const { setActiveModal } = useModal();
  const { user } = useAuth();
  const { updateClientInfo } = useClient();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const bulletinSchema = Yup.object().shape({
    subject: Yup.string().required("You must include a subject."),
    message: Yup.string().required("You must include a message."),
  });

  return (
    <>
      <StyledHeader><h2>Add a Note</h2></StyledHeader>
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
                        agencyId: user?.uid,
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
                        agencyId: user?.uid,
                        date: `${month} / ${date} / ${newDate?.getFullYear()}`,
                      },
                    ],
                  },
                }
            );
          }
          getClientProfile();
          setActiveModal("");
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormikField name="subject" label="Subject Line" />
            <StyledFormikField name="message" label="Message" type="textarea" />
            <StyledFormikFieldWrapper>
              <label htmlFor="isPrivate">
                Make this bulletin private (only those with access to your client
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
