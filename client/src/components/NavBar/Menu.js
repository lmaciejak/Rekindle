import React from "react";
import { Link } from "react-router-dom";

export default ({ close }) => (
  <div className="menu">
    <ul className="menuList">
      <li className="menuLi" onClick={close}>
        {" "}
        <Link
          to={"/"}
          style={{ textDecoration: "none", color: "rgb(53, 53, 53)" }}
        >
          {" "}
          Home{" "}
        </Link>
      </li>
      <li className="menuLi" onClick={close}>
        <Link
          to={"/dashboard"}
          style={{ textDecoration: "none", color: "rgb(53, 53, 53)" }}
        >
          {" "}
          Dashboard{" "}
        </Link>
      </li>
    </ul>
  </div>
);
