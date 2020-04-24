import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

export const Button = React.memo((props) => {
  return (
    <button {...props} className={`btn_root ${props.className}`}>
      {props.children}
    </button>
  );
});

Button.propTypes = {
  className: PropTypes.string,
};
