import React, { Fragment } from "react";
import spinner from "./spinner.gif";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ with: "200px", margin: "auto", display: "block" }}
      alt="loading..."
    />
  </Fragment>
);
