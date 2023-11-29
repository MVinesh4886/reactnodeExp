import React from "react";
import { Menu, Dropdown, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "../resources/default-layout.css";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("Expenses-User"));
  const navigate = useNavigate();
  const items = [
    {
      // key: "1",
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("Expenses-User");
            navigate("/login");
          }}
        >
          Logout
        </li>
      ),
    },
  ];
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Vinesh Krishna</h1>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
          >
            <Button className="primary">{user.name}</Button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
