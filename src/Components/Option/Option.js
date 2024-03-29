import React from "react";

const Option = props => {
  const { value } = props;
  return <option value={value}>{value}</option>;
};

export default Option;
