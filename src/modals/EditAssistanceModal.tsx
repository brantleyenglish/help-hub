import { Form, Formik } from "formik";
import React from "react";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import * as Yup from "yup";
import { ServiceType, SingleAssistanceType } from "../../DataTypes";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAssistance } from "../context/AssistanceContext";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { updateAssistance } from "../firebase/assistance";

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

const EditAssistanceModal: React.FC<{
  assistance: SingleAssistanceType | null;
}> = ({ assistance }) => {
  const { allServices } = usePublicData();
  const { user } = useAuth();
  const {
    updateAssistanceByClient,
    updateAssistanceByAgency,
  } = useAssistance();
  const { setActiveModal } = useModal();
  const assistanceSchema = Yup.object().shape({
    notes: Yup.string(),
    serviceId: Yup.string(),
  });
  const [isPrivate, setIsPrivate] = React.useState<boolean>(
    assistance?.isPrivate || false
  );
  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };
  return (
    <>
      <StyledHeader>
        <>
          <h2>Edit Assistance</h2>
          <p>
            Edit the service that you provided to{" "}
            {assistance?.client?.clientFirstName}{" "}
            {assistance?.client?.clientLastName}.
          </p>
          <p>
            This will be visible to all agencies unless you mark it as private.{" "}
          </p>
        </>
      </StyledHeader>
      <Formik
        initialValues={{
          notes: assistance?.notes || "",
          serviceId:
            assistance?.serviceId ||
            allServices?.find(
              (service: ServiceType) => service?.agencyId === user?.uid
            )?.id ||
            "",
        }}
        validationSchema={assistanceSchema}
        onSubmit={async (values) => {
          if (updateAssistanceByClient && assistance) {
            await updateAssistance({
              data: {
                ...assistance,
                isPrivate,
                serviceId: values?.serviceId,
                notes: values?.notes,
              },
            });

            if (updateAssistanceByClient && updateAssistanceByAgency) {
              await updateAssistanceByClient();
              await updateAssistanceByAgency();
            }
            setActiveModal("");
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormikField
              name="serviceId"
              label="Service Offered"
              type="select"
              options={
                allServices
                  ? allServices
                      ?.filter(
                        (service: ServiceType) =>
                          service?.agencyId === user?.uid
                      )
                      ?.map((service: ServiceType) => {
                        return {
                          value: service?.id,
                          label: service?.name,
                        };
                      })
                  : []
              }
            />
            <StyledFormikField
              name="notes"
              label="Anything to add?"
              type="textarea"
            />
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
            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditAssistanceModal;
