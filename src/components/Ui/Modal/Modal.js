import React, { useEffect } from "react";
import ReactDom from "react-dom";

import "./Modal.css";

const Backdrop = (props) => {
  const clickhandler = (e) => {
    if (e.target === e.currentTarget) {
      props.closeHandler();
    }
  };

  return (
    <div className="backdrop" onClick={clickhandler}>
      <div className="content">{props.children}</div>
    </div>
  );
};

const portals = document.querySelector("#portals");

const Modal = (props) => {
  useEffect(() => {
    const backdrop = document.querySelector(".backdrop");
    backdrop.style.top = `${document.documentElement.scrollTop}px`;
  }, []);

  return (
    <>
      {ReactDom.createPortal(
        <Backdrop closeHandler={props.closeHandler}>{props.children}</Backdrop>,
        portals
      )}
    </>
  );
};

export default Modal;
