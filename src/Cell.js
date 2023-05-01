import React, { useState, useEffect } from "react";

function Cell({ value, onCellValueChange }) {
  const [inputValue, setInputValue] = useState(value === "." ? "" : value);
  const isReadOnly = value !== ".";

  useEffect(() => {
    setInputValue(value === "." ? "" : value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (
      newValue === "" ||
      (newValue.length === 1 && /^[1-9]$/.test(newValue))
    ) {
      setInputValue(newValue);
      onCellValueChange(newValue);
    }
  };

  return (
    <input
      type="text"
      className="cell"
      value={inputValue}
      onChange={handleChange}
      readOnly={isReadOnly}
    />
  );
}

export default Cell;
