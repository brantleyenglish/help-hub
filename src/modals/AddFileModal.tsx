import { Form, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ClientFiles } from "../../DataTypes";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAgency } from "../context/AgencyContext";
import { useClient } from "../context/ClientContext";
import { useModal } from "../context/ModalContext";
import { storage } from "../firebase/config";

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

const AddFileModal: React.FC<{}> = ({ }) => {
  const { setActiveModal } = useModal();
  const { updateClientInfo, clientProfile, getClientProfile } = useClient();
  const { agency } = useAgency();
  const [isPrivate, setIsPrivate] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [downloadUrl, setDownloadUrl] = React.useState<string>("");

  const [fileData, setFileData] = React.useState<Partial<ClientFiles>>({});

  const toggleIsPrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFile(e.target.files ? e.target.files[0] : undefined);
  };

  const handleFileUpload = () => {
    if (file) {
      const uploadTask = storage
        .ref(`/clientFiles/${clientProfile?.id}/${file.name}`)
        .put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref(`/clientFiles/${clientProfile?.id}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setFile(undefined);
            setDownloadUrl(url);
          });
      });
    }
  };

  const submitFileDataToClient = async () => {
    const newDate = new Date();
    const month = ("0" + (newDate?.getMonth() + 1)).slice(-2);
    const date = ("0" + newDate?.getDate()).slice(-2);
    if (clientProfile?.id && updateClientInfo) {
      await updateClientInfo(
        clientProfile?.files
          ? {
            clientId: clientProfile?.id,
            newData: {
              files: [
                ...clientProfile?.files,
                {
                  ...fileData,
                  downloadUrl,
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
              files: [
                {
                  ...fileData,
                  downloadUrl,
                  agencyId: agency?.id,
                  agencyName: agency?.name,
                  date: `${month} / ${date} / ${newDate?.getFullYear()}`,
                },
              ],
            },
          }
      );
      if (clientProfile?.id && getClientProfile) {
        getClientProfile({ clientId: clientProfile?.id });
      }
      setActiveModal("");
    }
  };

  React.useEffect(() => {
    if (downloadUrl && downloadUrl?.length > 0) {
      submitFileDataToClient();
    }
  }, [downloadUrl]);

  const fileSchema = Yup.object().shape({
    fileTitle: Yup.string().required("You must include a subject."),
    description: Yup.string(),
  });

  return (
    <>
      <StyledHeader>
        <h2>Add a File</h2>
        <p>
          Upload a file for {clientProfile?.clientFirstName}{" "}
          {clientProfile?.clientLastName}.{" "}
        </p>
        <p>
          This will be visible to all agencies unless you mark it as private.{" "}
        </p>
      </StyledHeader>
      <Formik
        initialValues={{
          fileTitle: "",
          description: "",
        }}
        validationSchema={fileSchema}
        onSubmit={(values) => {
          setFileData({ ...values, isPrivate, clientId: clientProfile?.id });
          handleFileUpload();
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
                Make this file private (only those with access to your agency
                can view this file).
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
export default AddFileModal;
