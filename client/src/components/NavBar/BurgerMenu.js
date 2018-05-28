import React from "react";
import Popup from "reactjs-popup";
import BurgerIcon from "./BurgerIcon";
import Menu from "./Menu";

const BurgerMenu = () => {
  const contentStyle = {
    background: "rgba(255,255,255,0",
    width: "80%",
    border: "none",
    listStyleType: "none"
  };

  return (
    <div className="popupStyles">
      <Popup
        modal
        overlayStyle={{ background: "rgba(255,255,255,0.98" }}
        contentStyle={contentStyle}
        closeOnDocumentClick={false}
        trigger={open => <BurgerIcon open={open} />}
      >
        {close => <Menu close={close} />}
      </Popup>
    </div>
  );
};

export default BurgerMenu;
