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

const AddAssistanceModal: React.FC<{}> = () => {

    const { setActiveModal } = useModal();

    const assistanceSchema = Yup.object().shape({
        agencyId: Yup.string(),
        clientId: Yup.string(),
        date: Yup.string(),
        notes: Yup.string(),
        serviceId: Yup.string(),
    });

    return (
        <Formik
            initialValues={{
                agencyId: "",
                clientId: "",
                date: "",
                notes: "",
                serviceId: "",
            }}

            // TO DO: Update for AddService action

            validationSchema={assistanceSchema}
            onSubmit={async (values) => {
                console.log({ values });
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    [Service Name] - [Client Name] received help from [Agency Name] on [Date]
                    <StyledFormikField
                        name="notes"
                        label="Anything to add?"
                        type="textarea"
                    />
                    <StyledButton type="submit">Submit</StyledButton>
                </Form>
            )}
        </Formik>
    );
};
export default AddAssistanceModal;
