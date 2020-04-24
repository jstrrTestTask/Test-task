import React, { useRef, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../../utils/clickOutside";
import { DebounceInput } from "../DebounceInput/DebounceInput";
import "./SearchSelect.scss";

/*
Was created according to the mocks.
In terms of UX and code optimizations, it would be better to change the design.
For example see: https://material-ui.com/components/autocomplete/
 */

export const SearchSelect = ({
  className,
  items,
  searchable,
  withAvatar,
  placeholder,
  dropdownHeading,
}) => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [displayedItem, setDisplayedItem] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, showDropdown, () => setShowDropdown(false));

  useEffect(() => {
    if (showDropdown && searchable) {
      inputRef.current.focus();
    }
  }, [showDropdown, searchable]);

  useEffect(() => {
    const itemToDisplay = items.find((item) => item.id === selectedItem) || {};
    setDisplayedItem(itemToDisplay);
    setShowDropdown(false);
  }, [selectedItem, items]);

  useEffect(() => {
    const filteredItems =
      (Array.isArray(items) &&
        items.filter((item) =>
          item.label.toLowerCase().includes(search && search.toLowerCase())
        )) ||
      [];

    setFilteredItems(filteredItems);
  }, [search, items]);

  useEffect(() => {
    if (!showDropdown) {
      setSearch("");
    }
  }, [showDropdown]);

  const dropdownItems = useMemo(() => {
    if (withAvatar) {
      return filteredItems.map((item) => (
        <li key={item.id} onClick={(e) => setSelectedItem(item.id)}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/userIcons/${item.img}.jpg`}
            alt={`${item.label}'s avatar`}
          />
          <span>{item.label}</span>
        </li>
      ));
    } else {
      return filteredItems.map((item) => (
        <li key={item.id} onClick={(e) => setSelectedItem(item.id)}>
          <span>{item.label}</span>
        </li>
      ));
    }
  }, [withAvatar, filteredItems]);

  return (
    <div
      className={`${className} search-select_main`}
      onClick={() => setShowDropdown(true)}>
      <div className="search-select_placeholder">
        {!selectedItem && <span>{placeholder}</span>}
        {selectedItem && withAvatar && (
          <div className="search-select_placeholder_avatar">
            <img
              src={`${process.env.PUBLIC_URL}/assets/userIcons/${displayedItem.img}.jpg`}
              alt={`${displayedItem.label}'s avatar`}
            />
            <span>{displayedItem.label}</span>
          </div>
        )}
        {selectedItem && !withAvatar && <span>{displayedItem.label}</span>}
        {showDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
      {showDropdown && (
        <div className="dropdown_wrapper" ref={dropdownRef}>
          {searchable && (
            <div className="dropdown_heading">
              <FontAwesomeIcon icon={faSearch} />
              <DebounceInput
                ref={inputRef}
                debouncetime={500}
                onChange={setSearch}
              />
            </div>
          )}
          {!searchable && (
            <div className="dropdown_heading">
              <span className="dropdown_heading_text">{dropdownHeading}</span>
            </div>
          )}
          <ul>{dropdownItems}</ul>
        </div>
      )}
    </div>
  );
};

SearchSelect.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  searchable: PropTypes.bool,
  withAvatar: PropTypes.bool,
  placeholder: PropTypes.string,
  dropdownHeading: PropTypes.string,
};
