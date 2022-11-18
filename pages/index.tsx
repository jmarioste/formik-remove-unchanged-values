import { Field, Formik, Form } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { flattenObject } from "../utils/flattenObject";
import get from "lodash/get"
import set from "lodash/set"

const Home: NextPage = () => {
  const [resultObject, setResultObject] = useState<any>({});
  const [updatedValues, setUpdatedValues] = useState<any>({});
  const initialValue = {
    first_name: "John",
    last_name: "Doe",
    address: {
      street: "Sesame",
      zipCode: 1234,
    },
  };

  const handleSubmit = (values: typeof initialValue) => {
    const flattened = flattenObject(initialValue)
    let result: any = {}
    Object.entries(flattened)?.map(entry => {
      const [key, oldVal] = entry;
      const newVal = get(values, key)
      if (newVal !== oldVal) {
        set(result, key, newVal)
      }
    })
    setUpdatedValues(values)
    setResultObject(result)
  };
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 1366 }}>
      <Head>
        <title>Formik Tutorial</title>
      </Head>
      <h1>Tutorial formik remove fields</h1>
      <h2>Update User Form</h2>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form style={{ display: "flex", gap: 2, flexDirection: "column", maxWidth: 200 }}>
          <Field name="first_name" type="text" placeholder="First name" />
          <Field name="last_name" type="text" placeholder="Last name" />
          <Field name="address.street" type="text" placeholder="Street" />
          <Field name="address.zipCode" type="text" placeholder="Zip Code" />
          <button type="submit">Update User</button>
        </Form>
      </Formik>
      <h2>Values</h2>
      <pre>
        {JSON.stringify(updatedValues, null, 4)}
      </pre>
      <h2>Result Object</h2>

      <pre>
        {JSON.stringify(resultObject, null, 4)}
      </pre>
    </div>
  );
};

export default Home;
