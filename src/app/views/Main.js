import React from "react";
import { Form, Field } from "react-final-form";
import Axios from "axios";

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

const onSubmit = (values) => {
  const data = {
    origin: "*",
    crossDomain: true,
    headers: {
      ...Axios.defaults.headers.common,
      "Content-Type": "application/json",
      Authorization: "Token: api_C41252EF3BE14A3C8B33B8062C67628A",
      "Access-Control-Allow-Origin": "*",
    },
    body: { url: "https://airtable.com" }, //JSON.stringify(values),
  };
  fetchData(data);
};

export const Main = () => (
  <>
    <h1>Create PDF form website!</h1>

    <Form
      onSubmit={onSubmit}
      initialValues={{ pageOrientation: "auto", scrollPage: false }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>URL: </label>
            <Field name="url" component="input" type="text" placeholder="URL" />
          </div>

          <h2>Optional parameters:</h2>
          <div>
            <label>Margin: </label>
            <Field name="pageMargin" component="input" type="text" placeholder="Margin" />

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
            <Field name="delay" component="input" type="number" placeholder="0-5" />
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
          {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
        </form>
      )}
    />
  </>
);
