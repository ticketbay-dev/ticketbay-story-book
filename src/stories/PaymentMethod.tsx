import React, { useState } from 'react';
import './payment.css';

export interface PaymentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  badge?: string;
}

export interface PaymentMethodProps {
  /** Array of payment options */
  options: PaymentOption[];
  /** Selected payment method */
  value?: string;
  /** Default selected value for uncontrolled component */
  defaultValue?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Layout variant */
  layout?: 'grid' | 'list';
  /** Disabled state */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Required field indicator */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** onChange callback */
  onChange?: (value: string) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Payment Method component for Ticketbay design system
 */
export const PaymentMethod = ({
  options,
  value: controlledValue,
  defaultValue = '',
  size = 'medium',
  layout = 'list',
  disabled = false,
  label,
  required = false,
  error = false,
  helperText,
  onChange,
  className = '',
  ...props
}: PaymentMethodProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;
  const groupId = React.useId();

  const handleChange = (optionValue: string) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(optionValue);
    }
    
    onChange?.(optionValue);
  };

  return (
    <div className={[
      'ticketbay-payment-container',
      disabled ? 'ticketbay-payment-container--disabled' : '',
      error ? 'ticketbay-payment-container--error' : '',
      className
    ].filter(Boolean).join(' ')} {...props}>
      {label && (
        <div className={[
          'ticketbay-payment-label',
          disabled ? 'ticketbay-payment-label--disabled' : '',
          error ? 'ticketbay-payment-label--error' : ''
        ].filter(Boolean).join(' ')}>
          {label}
          {required && <span className="ticketbay-payment-required">*</span>}
        </div>
      )}
      <div className={[
        'ticketbay-payment-options',
        `ticketbay-payment-options--${layout}`,
        `ticketbay-payment-options--${size}`
      ].filter(Boolean).join(' ')}>
        {options.map((option) => {
          const selected = selectedValue === option.value;
          const optionDisabled = disabled || option.disabled;
          const inputId = `${groupId}-${option.value}`;
          
          return (
            <div
              key={option.value}
              className={[
                'ticketbay-payment-option',
                `ticketbay-payment-option--${size}`,
                selected ? 'ticketbay-payment-option--selected' : '',
                optionDisabled ? 'ticketbay-payment-option--disabled' : '',
                error ? 'ticketbay-payment-option--error' : ''
              ].filter(Boolean).join(' ')}
            >
              <input
                id={inputId}
                type="radio"
                name={`payment-${groupId}`}
                value={option.value}
                checked={selected}
                disabled={optionDisabled}
                onChange={() => handleChange(option.value)}
                className="ticketbay-payment-input"
              />
              <label
                htmlFor={inputId}
                className="ticketbay-payment-option-label"
              >
                <div className="ticketbay-payment-option-content">
                  {option.icon && (
                    <div className="ticketbay-payment-icon">
                      {option.icon}
                    </div>
                  )}
                  <div className="ticketbay-payment-text">
                    <div className="ticketbay-payment-title">
                      {option.label}
                      {option.badge && (
                        <span className="ticketbay-payment-badge">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    {option.description && (
                      <div className="ticketbay-payment-description">
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ticketbay-payment-radio">
                  <div className="ticketbay-payment-radio-circle">
                    {selected && <div className="ticketbay-payment-radio-dot" />}
                  </div>
                </div>
              </label>
            </div>
          );
        })}
      </div>
      {helperText && (
        <div className={[
          'ticketbay-payment-helper',
          error ? 'ticketbay-payment-helper--error' : ''
        ].filter(Boolean).join(' ')}>
          {helperText}
        </div>
      )}
    </div>
  );
};