import React, { useState } from 'react';
import './quantity.css';

export interface QuantityProps {
  /** Current quantity value */
  value?: number;
  /** Default value for uncontrolled component */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment/decrement */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Show input field */
  showInput?: boolean;
  /** Input placeholder */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Required field indicator */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text */
  helperText?: string;
  /** onChange callback */
  onChange?: (value: number) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Quantity Button component for Ticketbay design system
 */
export const Quantity = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 999,
  step = 1,
  disabled = false,
  size = 'medium',
  color = 'ticket-magenta',
  showInput = true,
  placeholder = '0',
  label,
  required = false,
  error = false,
  helperText,
  onChange,
  className = '',
  ...props
}: QuantityProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const quantityId = React.useId();

  const updateValue = (newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    if (!isControlled) {
      setInternalValue(clampedValue);
    }
    
    onChange?.(clampedValue);
  };

  const handleIncrement = () => {
    if (!disabled) {
      updateValue(currentValue + step);
    }
  };

  const handleDecrement = () => {
    if (!disabled) {
      updateValue(currentValue - step);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || 0;
    updateValue(newValue);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || min;
    updateValue(newValue);
  };

  const canDecrement = currentValue > min && !disabled;
  const canIncrement = currentValue < max && !disabled;

  return (
    <div className={[
      'ticketbay-quantity-container',
      `ticketbay-quantity-container--${size}`,
      disabled ? 'ticketbay-quantity-container--disabled' : '',
      error ? 'ticketbay-quantity-container--error' : '',
      className
    ].filter(Boolean).join(' ')} {...props}>
      {label && (
        <label 
          htmlFor={quantityId}
          className={[
            'ticketbay-quantity-label',
            `ticketbay-quantity-label--${size}`,
            disabled ? 'ticketbay-quantity-label--disabled' : '',
            error ? 'ticketbay-quantity-label--error' : ''
          ].filter(Boolean).join(' ')}
        >
          {label}
          {required && <span className="ticketbay-quantity-required">*</span>}
        </label>
      )}
      <div className={[
        'ticketbay-quantity-control',
        `ticketbay-quantity-control--${size}`,
        `ticketbay-quantity-control--${color}`,
        disabled ? 'ticketbay-quantity-control--disabled' : '',
        error ? 'ticketbay-quantity-control--error' : ''
      ].filter(Boolean).join(' ')}>
        <button
          type="button"
          className={[
            'ticketbay-quantity-button',
            'ticketbay-quantity-button--decrement',
            `ticketbay-quantity-button--${size}`,
            !canDecrement ? 'ticketbay-quantity-button--disabled' : ''
          ].filter(Boolean).join(' ')}
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Decrease quantity"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 8h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        
        {showInput ? (
          <input
            id={quantityId}
            type="number"
            className={[
              'ticketbay-quantity-input',
              `ticketbay-quantity-input--${size}`
            ].filter(Boolean).join(' ')}
            value={currentValue}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        ) : (
          <div className={[
            'ticketbay-quantity-display',
            `ticketbay-quantity-display--${size}`
          ].filter(Boolean).join(' ')}>
            {currentValue}
          </div>
        )}
        
        <button
          type="button"
          className={[
            'ticketbay-quantity-button',
            'ticketbay-quantity-button--increment',
            `ticketbay-quantity-button--${size}`,
            !canIncrement ? 'ticketbay-quantity-button--disabled' : ''
          ].filter(Boolean).join(' ')}
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Increase quantity"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 4v8M4 8h8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {helperText && (
        <div className={[
          'ticketbay-quantity-helper',
          error ? 'ticketbay-quantity-helper--error' : ''
        ].filter(Boolean).join(' ')}>
          {helperText}
        </div>
      )}
    </div>
  );
};