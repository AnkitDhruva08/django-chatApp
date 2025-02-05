import React, { useState } from 'react';

function Input({
  value = '',
  placeholder = '',
  isRequired = true,
  error = '',
  disabled = false,
  type = 'text',
  inputClass = '',
  onChange,
}) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue); // Callback for external handling
    }
  };

  const id = `input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="lms-input-container">
      <input
        id={id}
        className={`lms-input ${inputClass} ${error && error.length > 0 ? 'error' : ''}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        type={type}
      />
      <label htmlFor={id} className="lms-placeholder">
        {placeholder}
        {isRequired && <span>*</span>}
      </label>
      {error && error.length > 0 && (
        <div>
          <span className="lms-error-msg">(i) {error}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
