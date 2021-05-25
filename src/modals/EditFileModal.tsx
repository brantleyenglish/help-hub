import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ClientFiles } from "../../DataTypes";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
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

type EditFileModalType = {
  file: ClientFiles;
};

const EditFileModal = ({ file }: EditFileModalType) => {
  const { setActiveModal } = useModal();
  const { updateClientInfo, clientProfile, getClientProfile } = useClient();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(
    file?.isPrivate || false
  );
  const [newfile, setNewFile] = React.useState<File | undefined>(undefined);
  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const bulletinSchema = Yup.object().shape({
    fileTitle: Yup.string().required("You must include a subject."),
    description: Yup.string().required("You must include a message."),
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewFile(e.target.files ? e.target.files[0] : undefined);
  };

  return (
    <>
      <StyledHeader>
        <h2>Edit a File</h2>
        <p>Edit the name or description.</p>
        <p>
          This will be visible to all agencies unless you mark it as private.{" "}
        </p>
      </StyledHeader>
      <Formik
        initialValues={{
          fileTitle: file?.fileTitle || "",
          description: file?.description || "",
        }}
        validationSchema={bulletinSchema}
        onSubmit={async (values) => {
          if (clientProfile?.files && clientProfile?.id && updateClientInfo) {
            const fileIndex = clientProfile?.files.findIndex(
              (currentFile: ClientFiles) =>
                currentFile?.fileTitle === file?.fileTitle
            );
            const newFiles = [
              ...clientProfile?.files?.slice(0, fileIndex),
              {
                ...values,
                isPrivate,
                downloadUrl: file?.downloadUrl,
                clientId: file?.clientId,
                agencyId: file?.agencyId,
                date: file?.date,
              },
              ,
              ...clientProfile?.files?.slice(fileIndex + 1),
            ]?.filter((fileValue) => !!fileValue);
            await updateClientInfo({
              clientId: clientProfile?.id,
              newData: { files: newFiles },
            });
          }
          if (clientProfile?.id && getClientProfile) {
            getClientProfile({ clientId: clientProfile?.id });
          }
          setActiveModal("");
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormikField name="fileTitle" label="File Title" />
            <StyledFormikField
              name="description"
              label="Description"
              type="textarea"
            />
            <StyledFormikFieldWrapper>
              <label htmlFor="file">Upload File</label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
              />
            </StyledFormikFieldWrapper>
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
            <StyledButton type="submit">Submit</StyledButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditFileModal;
