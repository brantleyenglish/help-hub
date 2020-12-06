import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormikDateInput } from "../components/DateInput";
import DropdownInput from "../components/DropdownInput";
import { useAuth } from "../context/AuthContext";

const NewClientForm = () => {
  const [error, setError] = React.useState("");
  const { user, loginUser } = useAuth();
  const [readyForRedirect, setReadyForRedirect] = React.useState<boolean>(
    false
  );

  const loginValidationSchema = Yup.object().shape({
    firstName: Yup?.string()?.required(),
    lastName: Yup?.string()?.required(),
    dob: Yup?.string()?.required(),
    phone: Yup?.string(),
    address: Yup?.string(),
    city: Yup?.string(),
    zip: Yup?.string(),
    gender: Yup?.string(),
    ethnicity: Yup?.string(),
  });

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        gender: "",
        ethnicity: "",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values) => {
        if (values?.firstName && values?.lastName && values?.dob) {
          try {
            console.log(values);
            // await createClient(values);
          } catch (e) {
            setError(e?.message);
          }
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <h1>Create Client</h1>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="lastName" />

          <label htmlFor="dob">Date of Birth</label>
          <FormikDateInput
            fieldName="dob"
            setFieldValue={setFieldValue}
            intialValue={values?.dob}
            label="Date of Birth"
          />
          <label htmlFor="phone">Phone #</label>
          <Field name="phone" type="phone" />

          <label htmlFor="address">Street Address</label>
          <Field name="address" type="address" />

          <label htmlFor="city">City</label>
          <Field name="city" type="city" />

          <label htmlFor="zip">Zip</label>
          <Field name="zip" type="zip" />

          <label htmlFor="gender">Gender</label>
          <DropdownInput
            name="gender"
            setFieldValue={setFieldValue}
            options={[
              {
                value: "m",
                label: "Male",
              },
              {
                value: "f",
                label: "female",
              },
              {
                value: "other",
                label: "Other / N/A",
              },
            ]}
          />

          <label htmlFor="ethnicity">Ethnicty</label>
          <DropdownInput
            name="ethnicity"
            setFieldValue={setFieldValue}
            options={[
              {
                value: "white",
                label: "White",
              },
              {
                value: "black",
                label: "Black / African American",
              },
              {
                value: "hispanic",
                label: "Hispanic / Latino",
              },
              {
                value: "asian",
                label: "Asian American",
              },
              {
                value: "native",
                label: "American Indian / Alaska Native",
              },
              {
                value: "pacific",
                label: "Native Hawaiian / Pacific Islander",
              },
              {
                value: "other",
                label: "Other / N/A",
              },
            ]}
          />

          <button type="submit">Submit</button>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default NewClientForm;
