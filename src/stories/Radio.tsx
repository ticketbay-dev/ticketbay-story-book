import React, { useState } from 'react';
import './radio.css';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioProps {
  /** Single radio button value */
  value?: string;
  /** Single radio button label */
  label?: string;
  /** Single radio button checked state */
  checked?: boolean;
  /** Single radio button disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Name attribute for form grouping */
  name?: string;
  /** onChange callback for single radio */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** CSS class name */
  className?: string;
}

export interface RadioGroupProps {
  /** Array of radio options */
  options: RadioOption[];
  /** Selected value */
  value?: string;
  /** Default selected value for uncontrolled component */
  defaultValue?: string;
  /** Group name for form */
  name?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Required field indicator */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** Group label */
  label?: string;
  /** onChange callback */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Single Radio component
 */
export const Radio = ({
  value = '',
  label,
  checked = false,
  disabled = false,
  size = 'medium',
  color = 'ticket-magenta',
  name,
  onChange,
  className = '',
  ...props
}: RadioProps) => {
  const radioId = React.useId();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(value, event);
  };

  return (
    <div className={[
      'ticketbay-radio-container',
      `ticketbay-radio-container--${size}`,
      disabled ? 'ticketbay-radio-container--disabled' : '',
      className
    ].filter(Boolean).join(' ')}>
      <div className="ticketbay-radio-wrapper">
        <input
          id={radioId}
          type="radio"
          className={[
            'ticketbay-radio-input',
            `ticketbay-radio-input--${size}`,
            `ticketbay-radio-input--${color}`
          ].filter(Boolean).join(' ')}
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <div className={[
          'ticketbay-radio-circle',
          `ticketbay-radio-circle--${size}`,
          `ticketbay-radio-circle--${color}`,
          checked ? 'ticketbay-radio-circle--checked' : '',
          disabled ? 'ticketbay-radio-circle--disabled' : ''
        ].filter(Boolean).join(' ')}>
          {checked && <div className="ticketbay-radio-dot" />}
        </div>
        {label && (
          <label 
            htmlFor={radioId}
            className={[
              'ticketbay-radio-label',
              `ticketbay-radio-label--${size}`,
              disabled ? 'ticketbay-radio-label--disabled' : ''
            ].filter(Boolean).join(' ')}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

/**
 * Radio Group component for Ticketbay design system
 */
export const RadioGroup = ({
  options,
  value: controlledValue,
  defaultValue = '',
  name,
  size = 'medium',
  color = 'ticket-magenta',
  direction = 'vertical',
  required = false,
  error = false,
  helperText,
  label,
  onChange,
  className = '',
  ...props
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;
  const groupId = React.useId();
  const groupName = name || `radio-group-${groupId}`;

  const handleChange = (optionValue: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    
    onChange?.(optionValue, event);
  };

  return (
    <div className={[
      'ticketbay-radio-group',
      `ticketbay-radio-group--${direction}`,
      error ? 'ticketbay-radio-group--error' : '',
      className
    ].filter(Boolean).join(' ')} {...props}>
      {label && (
        <div className={[
          'ticketbay-radio-group-label',
          error ? 'ticketbay-radio-group-label--error' : ''
        ].filter(Boolean).join(' ')}>
          {label}
          {required && <span className="ticketbay-radio-required">*</span>}
        </div>
      )}
      <div className={[
        'ticketbay-radio-group-options',
        `ticketbay-radio-group-options--${direction}`
      ].filter(Boolean).join(' ')}>
        {options.map((option) => (
          <div key={option.value} className="ticketbay-radio-option">
            <Radio
              value={option.value}
              label={option.label}
              checked={selectedValue === option.value}
              disabled={option.disabled}
              size={size}
              color={color}
              name={groupName}
              onChange={handleChange}
            />
            {option.description && (
              <div className="ticketbay-radio-description">
                {option.description}
              </div>
            )}
          </div>
        ))}
      </div>
      {helperText && (
        <div className={[
          'ticketbay-radio-helper',
          error ? 'ticketbay-radio-helper--error' : ''
        ].filter(Boolean).join(' ')}>
          {helperText}
        </div>
      )}
    </div>
  );
};