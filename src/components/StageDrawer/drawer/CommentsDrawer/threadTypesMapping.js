import React from "react";
import {
  InfoRounded,
  HelpRounded,
  BugReportRounded,
  WarningRounded,
  CancelRounded,
} from "@material-ui/icons";

const typeToIconMapping = {
  info: {
    title: "Info",
    value: "info",
    color: "blue",
    icon: <InfoRounded style={{ color: "blue" }} />,
  },
  question: {
    title: "Question",
    value: "question",
    color: "green",
    icon: <HelpRounded style={{ color: "green" }} />,
  },
  bug: {
    title: "Bug",
    value: "bug",
    color: "black",
    icon: <BugReportRounded style={{ color: "black" }} />,
  },
  warning: {
    title: "Warning",
    value: "warning",
    color: "orange",
    icon: <WarningRounded style={{ color: "orange" }} />,
  },
  error: {
    title: "Error",
    value: "error",
    color: "red",
    icon: <CancelRounded style={{ color: "red" }} />,
  },
};

export default typeToIconMapping;
