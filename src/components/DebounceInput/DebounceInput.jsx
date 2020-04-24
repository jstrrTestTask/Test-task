import React from "react";
import PropTypes from "prop-types";
// better use react-debounce-input or debouncers from ui kits or lodash/_
export const DebounceInput = React.memo(
  React.forwardRef((props, ref) => {
    let debounceTimer = null;

    const changeHandler = (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(
        props.onChange.bind(null, e.target.value),
        props.debouncetime
      );
    };

    return (
      <input
        {...props}
        type="text"
        ref={ref}
        onChange={(e) => changeHandler(e)}
      />
    );
  })
);

DebounceInput.propTypes = {
  debouncetime: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
