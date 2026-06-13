import React from "react";
import PageTitle from "./PageTitle";

function PageHeading({ title, children }) {
  return (
    <div className="Page-heading-container">
      <PageTitle title={title} />
      <p className="page-heading-paragraph">{children}</p>
    </div>
  );
}

export default PageHeading;
