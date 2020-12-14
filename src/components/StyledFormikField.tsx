import { ErrorMessage, Field } from "formik";
import React from "react";
import styled from "styled-components";
import { theme } from "../components/Theme";

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

type SelectOptionType = {
  label: string;
  value: string;
};

type StyledFormikFieldType = {
  name: string;
  label: string;
  type?: "input" | "textarea" | "select";
  options?: SelectOptionType[];
};

const StyledFormikField = ({
  name,
  label,
  type = "input",
  options = [],
}: StyledFormikFieldType) => {
  return (
    <StyledFormikFieldWrapper>
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <Field name={name} id={name} as={type}>
          {options?.map((option: SelectOptionType) => (
            <option value={option?.value} key={option?.value}>
              {option?.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field name={name} id={name} as={type} />
      )}
      <ErrorMessage name={name} />
    </StyledFormikFieldWrapper>
  );
};

export default StyledFormikField;
