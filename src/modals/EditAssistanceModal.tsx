import { Form, Formik } from "formik";
import React from "react";
import { usePublicData } from "src/context/PublicContext";
import styled from "styled-components";
import * as Yup from "yup";
import { ClientType, ServiceType } from "../../DataTypes";
import StyledFormikField from "../components/StyledFormikField";
import { theme } from "../components/Theme";
import { useAssistance } from "../context/AssistanceContext";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import { AssistanceDataType } from "../../DataTypes";

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

const EditAssistanceModal: React.FC<{
    assistance: AssistanceDataType | null;
}> = ({ assistance }) => {
    const { allServices } = usePublicData();
    const { user } = useAuth();
    const { updateAssistanceByClient } = useAssistance();
    const { setActiveModal } = useModal();
    const assistanceSchema = Yup.object().shape({
        notes: Yup.string(),
        serviceId: Yup.string(),
    });
    const [isPrivate, setIsPrivate] = React.useState<boolean>(false);
    const toggleIsPrivate = () => {
        setIsPrivate(!isPrivate);
    };
    return (
        <>
            <h1>Edit Assistance</h1>
            <Formik
                initialValues={{
                    notes: assistance?.notes || "",
                    serviceId:
                        allServices?.find(
                            (service: ServiceType) => service?.agencyId === user?.uid
                        )?.id || "",
                }}
                validationSchema={assistanceSchema}
                onSubmit={async (values) => {
                    console.log({ values });
                    if (updateAssistanceByClient && assistance) {

                        // const newDate = new Date();
                        // const month = ("0" + (newDate?.getMonth() + 1)).slice(-2);
                        // const date = ("0" + newDate?.getDate()).slice(-2);
                        // await createAssistance({
                        //     data: {
                        //         ...values,
                        //         isPrivate,
                        //         agencyId: user?.uid || "",
                        //         clientId: client?.id || "",
                        //         date: `${month} / ${date} / ${newDate?.getFullYear()}`,
                        //     },
                        // });

                        // if (updateAssistanceByClient) {
                        //     await updateAssistanceByClient();
                        // }
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
                                            (service: ServiceType) => service?.agencyId === user?.uid
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
                                Make this bulletin private (only those with access to your agency
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

export default EditAssistanceModal;