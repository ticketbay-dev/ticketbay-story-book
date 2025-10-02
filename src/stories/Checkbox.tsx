import React, { useState } from 'react';
import './checkbox.css';

export interface CheckboxProps {
  /** Checkbox checked state */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Indeterminate state (partial check) */
  indeterminate?: boolean;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Required field indicator */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Name attribute for forms */
  name?: string;
  /** Value attribute */
  value?: string;
  /** onChange callback */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** onFocus callback */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** onBlur callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Checkbox component for Ticketbay design system
 */
export const Checkbox = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  indeterminate = false,
  label,
  size = 'medium',
  color = 'ticket-magenta',
  required = false,
  error = false,
  helperText,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ...props
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked, event);
  };

  const checkboxId = React.useId();

  return (
    <div className={[
      'ticketbay-checkbox-container',
      `ticketbay-checkbox-container--${size}`,
      disabled ? 'ticketbay-checkbox-container--disabled' : '',
      error ? 'ticketbay-checkbox-container--error' : '',
      className
    ].filter(Boolean).join(' ')}>
      <div className="ticketbay-checkbox-wrapper">
        <input
          id={checkboxId}
          type="checkbox"
          className={[
            'ticketbay-checkbox-input',
            `ticketbay-checkbox-input--${size}`,
            `ticketbay-checkbox-input--${color}`,
            error ? 'ticketbay-checkbox-input--error' : ''
          ].filter(Boolean).join(' ')}
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={(input) => {
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
          {...props}
        />
        <div className={[
          'ticketbay-checkbox-box',
          `ticketbay-checkbox-box--${size}`,
          `ticketbay-checkbox-box--${color}`,
          checked ? 'ticketbay-checkbox-box--checked' : '',
          indeterminate ? 'ticketbay-checkbox-box--indeterminate' : '',
          disabled ? 'ticketbay-checkbox-box--disabled' : '',
          error ? 'ticketbay-checkbox-box--error' : ''
        ].filter(Boolean).join(' ')}>
          {(checked || indeterminate) && (
            <svg 
              className="ticketbay-checkbox-icon"
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              {indeterminate ? (
                <path
                  d="M4 8h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M13.5 4.5L6 12l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          )}
        </div>
        {label && (
          <label 
            htmlFor={checkboxId}
            className={[
              'ticketbay-checkbox-label',
              `ticketbay-checkbox-label--${size}`,
              disabled ? 'ticketbay-checkbox-label--disabled' : '',
              error ? 'ticketbay-checkbox-label--error' : ''
            ].filter(Boolean).join(' ')}
          >
            {label}
            {required && <span className="ticketbay-checkbox-required">*</span>}
          </label>
        )}
      </div>
      {helperText && (
        <div className={[
          'ticketbay-checkbox-helper',
          error ? 'ticketbay-checkbox-helper--error' : ''
        ].filter(Boolean).join(' ')}>
          {helperText}
        </div>
      )}
    </div>
  );
};