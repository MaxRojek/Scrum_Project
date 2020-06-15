import React from "react";
import { Form, Field } from "react-final-form";
import request from "request";
import * as fs from "fs";

const fetchData = (fetchData) => {
  //   console.log(fetchData);
  //   fetch("https://api.sejda.com/v2/html-pdf", fetchData)
  //     .then((res) => {
  //       console.log(res.json());
  //     })
  //     .catch((e) => console.error(e));
};

const onSubmit = (values) => {
  //   const data = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Token: api_D994DB201DFC418A929F4BF0BDFD12DF",
  //     },
  //     body: values,
  //   };
  //   fetchData(data);
  var opts = {
    uri: "https://api.sejda.com/v2/html-pdf",
    headers: {
      Authorization: "Token: api_D994DB201DFC418A929F4BF0BDFD12DF",
    },
    json: {
      url: "https://airtable.com",
      viewportWidth: 1200,
    },
  };

  request
    .post(opts)
    .on("error", function (err) {
      return console.error(err);
    })
    .on("response", function (response) {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream("/tmp/out.pdf")).on("finish", function () {
          console.log("PDF saved to disk");
        });
      } else {
        return console.error("Got code: " + response.statusCode);
      }
    });
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
