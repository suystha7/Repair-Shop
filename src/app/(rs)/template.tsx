import React, { ReactNode } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  return <div className="animate-appear">{children}</div>;
};

export default Template;
