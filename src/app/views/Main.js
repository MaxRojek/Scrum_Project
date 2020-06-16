import React from "react";
import { Form, Field } from "react-final-form";
import Axios from "axios";
import Styles from "./Main-styles";

const fetchData = async (fetchData) => {
  console.log(fetchData);
  return Axios.post("https://api.sejda.com/v2/html-pdf", fetchData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const required = (value) => (value ? undefined : "Required");
const url = (value) => (regex.test(value) ? undefined : `Should be url`);
const minValue = (min) => (value) => (isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`);
const maxValue = (max) => (value) => (isNaN(value) || value >= max ? undefined : `Should be greater than ${max}`);
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const onSubmit = (values) => {
  const data = {
    origin: "*",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token: api_C41252EF3BE14A3C8B33B8062C67628A",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(values),
  };
  fetchData(data);
};

export const Main = () => (
  <Styles>
    <h1>Create PDF form website!</h1>

    <Form
      onSubmit={onSubmit}
      initialValues={{ pageOrientation: "auto", scrollPage: false }}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>URL: </label>
            <Field name="url" validate={composeValidators(required, url)}>
              {({ input, meta }) => (
                <>
                  <input {...input} type="text" placeholder="url" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>
          </div>

          <h2>Optional parameters:</h2>
          <div>
            <label>Margin: </label>
            <Field name="pageMargin" validate={minValue(0)}>
              {({ input, meta }) => (
                <>
                  <input {...input} type="number" placeholder="Margin" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>

            <label>Margin unit:</label>
            <Field name="pageMarginUnits" component="select">
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="px">px</option>
              <option value="in">in</option>
            </Field>
          </div>
          <div>
            <label>Delay: </label>
            <Field name="delay" validate={composeValidators(minValue(0), maxValue(5))}>
              {({ input, meta }) => (
                <>
                  <input {...input} type="number" placeholder="0-5" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </>
              )}
            </Field>
          </div>
          <div>
            <label>Scroll page: </label>
            <Field name="scrollPage" component="input" type="checkbox" />
          </div>
          <div>
            <label>Page orientation: </label>
            <div>
              <label>
                <Field name="pageOrientation" component="input" type="radio" value="auto" /> Auto
              </label>
              <label>
                <Field name="pageOrientation" component="input" type="radio" value="portrait" /> Portrait
              </label>
              <label>
                <Field name="pageOrientation" component="input" type="radio" value="landscape" /> Landscape
              </label>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" disabled={submitting || pristine}>
              Submit
            </button>
            <button type="button" onClick={form.reset} disabled={submitting || pristine}>
              Reset
            </button>
          </div>
        </form>
      )}
    />
  </Styles>
);
