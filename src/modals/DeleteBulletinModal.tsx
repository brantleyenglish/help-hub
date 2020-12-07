import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { Form, Formik } from "formik";
import StyledFormikField from "../components/StyledFormikField";
import * as Yup from "yup";


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

const DeleteBulletinModal = () => {
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

            // TO DO: Update for Delete action

            validationSchema={bulletinSchema}
            onSubmit={async (values) => {
                console.log({ values });
            }}
        >
            {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete this bulletin?</p>
                    <StyledButton type="submit">Yes</StyledButton>
                </Form>
            )}
        </Formik>
    );
};

export default DeleteBulletinModal;
