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
const StyledHeader = styled.div`
color: ${theme.colors.blue};
`;

const AddFileModal: React.FC<{}> = () => {

    const { setActiveModal } = useModal();

    const noteSchema = Yup.object().shape({
        fileTitle: Yup.string().required("You must include a subject."),
        description: Yup.string(),
        isPrivate: Yup.string(),
        date: Yup.string(),
        agencyId: Yup.string(),
        clientId: Yup.string(),
    });

    return (
        <>
            <StyledHeader><h2>Add a File</h2></StyledHeader>
            <Formik
                initialValues={{
                    fileTitle: "",
                    description: "",
                    isPrivate: "false",
                    date: "",
                    agencyId: "",
                    clientId: "",
                }}

                // TO DO: Update for AddFile action

                validationSchema={noteSchema}
                onSubmit={async (values) => {
                    console.log({ values });
                }}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <StyledFormikField name="fileTitle" label="Name of File" />
                        <StyledFormikField
                            name="description"
                            label="Description of File (optional)"
                            type="textarea"
                        />
                        <input type="checkbox" />
                        <p>Make this file private (only those with access to your agency can view this file).</p>
                        <StyledButton type="submit">Submit</StyledButton>
                    </Form>
                )}
            </Formik>
        </>
    );
};
export default AddFileModal;
