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

const AddNoteModal: React.FC<{}> = () => {

    const { setActiveModal } = useModal();

    const noteSchema = Yup.object().shape({
        noteTitle: Yup.string().required("You must include a subject."),
        noteBody: Yup.string().required("You must include a message."),
        isPrivate: Yup.string(),
        date: Yup.string(),
        agencyId: Yup.string(),
    });

    return (
        <Formik
            initialValues={{
                noteTitle: "",
                noteBody: "",
                isPrivate: "false",
                date: "",
                agencyId: "",
            }}

            // TO DO: Update for AddNote action

            validationSchema={noteSchema}
            onSubmit={async (values) => {
                console.log({ values });
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <StyledFormikField name="noteTitle" label="Title of Note" />
                    <StyledFormikField
                        name="noteBody"
                        label="Note"
                        type="textarea"
                    />
                    <input type="checkbox" />
                    <p>Make this note private (only those with access to your agency can view this message).</p>
                    <StyledButton type="submit">Submit</StyledButton>
                </Form>
            )}
        </Formik>
    );
};
export default AddNoteModal;
