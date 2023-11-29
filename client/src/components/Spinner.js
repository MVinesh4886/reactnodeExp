import React from "react";
import { Spin } from "antd";

function Spinner() {
  return (
    <div className="spinner">
      <Spin color="white" style={{ color: "white" }} size="large" />
    </div>
  );
}

export default Spinner;
