import React, { useState } from 'react';
import './dateinput.css';

export interface DateInputProps {
  /** DateInput state from Figma mo/dateinput component */
  state?: 'enabled' | 'selected' | 'disabled';
  /** Placeholder text */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Error message */
  errorMessage?: string;
  /** Default value */
  defaultValue?: string;
  /** Value */
  value?: string;
  /** onChange callback */
  onChange?: (value: string) => void;
  /** onClick callback */
  onClick?: () => void;
  /** CSS class name */
  className?: string;
  /** Required field indicator */
  required?: boolean;
}

/**
 * DateInput component based on Figma mo/dateinput design
 */
export const DateInput = ({
  state = 'enabled',
  placeholder = 'YYYY.MM.DD',
  label,
  errorMessage,
  defaultValue,
  value,
  onChange,
  onClick,
  className = '',
  required = false,
  ...props
}: DateInputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;
  const isSelected = state === 'selected' || (currentValue && currentValue.length > 0);
  const isDisabled = state === 'disabled';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = () => {
    if (!isDisabled) {
      onClick?.();
    }
  };

  // Format date value for display
  const formatDateValue = (val: string) => {
    // Remove non-numeric characters
    const numericOnly = val.replace(/[^\d]/g, '');
    
    // Add dots at appropriate positions
    if (numericOnly.length >= 8) {
      return `${numericOnly.slice(0, 4)}.${numericOnly.slice(4, 6)}.${numericOnly.slice(6, 8)}`;
    } else if (numericOnly.length >= 6) {
      return `${numericOnly.slice(0, 4)}.${numericOnly.slice(4, 6)}.${numericOnly.slice(6)}`;
    } else if (numericOnly.length >= 4) {
      return `${numericOnly.slice(0, 4)}.${numericOnly.slice(4)}`;
    }
    return numericOnly;
  };

  const displayValue = currentValue ? formatDateValue(currentValue) : '';

  return (
    <div className={`dateinput-wrapper ${className}`}>
      {label && (
        <label className={`dateinput-label ${isDisabled ? 'dateinput-label--disabled' : ''}`}>
          {label}
          {required && <span className="dateinput-required">*</span>}
        </label>
      )}
      <div
        className={[
          'dateinput',
          `dateinput--${state}`,
          isSelected ? 'dateinput--selected' : '',
          isFocused ? 'dateinput--focused' : '',
          errorMessage ? 'dateinput--error' : '',
          className
        ].filter(Boolean).join(' ')}
        onClick={handleClick}
      >
        <input
          type="text"
          className="dateinput-input"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isDisabled}
          maxLength={10}
          {...props}
        />
        <div className="dateinput-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 7.5H17.5M4.16667 3.33333H15.8333C16.7538 3.33333 17.5 4.07953 17.5 5V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5C2.5 4.07953 3.24619 3.33333 4.16667 3.33333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {errorMessage && (
        <div className="dateinput-error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};