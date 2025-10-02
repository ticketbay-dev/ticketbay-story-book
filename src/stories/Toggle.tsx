import React, { useState } from 'react';
import './toggle.css';

export interface ToggleProps {
  /** Toggle checked state */
  checked?: boolean;
  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Required field indicator */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Loading state */
  loading?: boolean;
  /** Icons for on/off states */
  icons?: {
    on?: React.ReactNode;
    off?: React.ReactNode;
  };
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
 * Toggle Button component for Ticketbay design system
 */
export const Toggle = ({
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  size = 'medium',
  color = 'ticket-magenta',
  label,
  labelPosition = 'right',
  required = false,
  error = false,
  helperText,
  loading = false,
  icons,
  onChange,
  onFocus,
  onBlur,
  className = '',
  ...props
}: ToggleProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  const toggleId = React.useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked, event);
  };

  const toggleElement = (
    <div className={[
      'ticketbay-toggle-switch',
      `ticketbay-toggle-switch--${size}`,
      `ticketbay-toggle-switch--${color}`,
      checked ? 'ticketbay-toggle-switch--checked' : '',
      disabled ? 'ticketbay-toggle-switch--disabled' : '',
      error ? 'ticketbay-toggle-switch--error' : '',
      loading ? 'ticketbay-toggle-switch--loading' : ''
    ].filter(Boolean).join(' ')}>
      <input
        id={toggleId}
        type="checkbox"
        className="ticketbay-toggle-input"
        checked={checked}
        disabled={disabled || loading}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
      <div className="ticketbay-toggle-track">
        <div className="ticketbay-toggle-thumb">
          {loading ? (
            <div className="ticketbay-toggle-spinner" />
          ) : icons ? (
            <div className="ticketbay-toggle-icon">
              {checked ? icons.on : icons.off}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  const labelElement = label && (
    <label 
      htmlFor={toggleId}
      className={[
        'ticketbay-toggle-label',
        `ticketbay-toggle-label--${size}`,
        disabled ? 'ticketbay-toggle-label--disabled' : '',
        error ? 'ticketbay-toggle-label--error' : ''
      ].filter(Boolean).join(' ')}
    >
      {label}
      {required && <span className="ticketbay-toggle-required">*</span>}
    </label>
  );

  return (
    <div className={[
      'ticketbay-toggle-container',
      `ticketbay-toggle-container--${size}`,
      `ticketbay-toggle-container--${labelPosition}`,
      disabled ? 'ticketbay-toggle-container--disabled' : '',
      error ? 'ticketbay-toggle-container--error' : '',
      className
    ].filter(Boolean).join(' ')}>
      <div className="ticketbay-toggle-wrapper">
        {labelPosition === 'left' && labelElement}
        {toggleElement}
        {labelPosition === 'right' && labelElement}
      </div>
      {helperText && (
        <div className={[
          'ticketbay-toggle-helper',
          error ? 'ticketbay-toggle-helper--error' : ''
        ].filter(Boolean).join(' ')}>
          {helperText}
        </div>
      )}
    </div>
  );
};