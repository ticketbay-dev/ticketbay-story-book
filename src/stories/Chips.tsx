import React, { useState } from 'react';
import './chips.css';

export interface ChipOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ChipsProps {
  /** Array of chip options */
  options: ChipOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Default selected value(s) for uncontrolled component */
  defaultValue?: string | string[];
  /** Allow multiple selection */
  multiple?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Chip variant */
  variant?: 'filled' | 'outlined' | 'soft';
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
  onChange?: (value: string | string[]) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Choice Chips component for Ticketbay design system
 */
export const Chips = ({
  options,
  value: controlledValue,
  defaultValue = '',
  multiple = false,
  size = 'medium',
  color = 'ticket-magenta',
  variant = 'outlined',
  disabled = false,
  label,
  required = false,
  error = false,
  helperText,
  onChange,
  className = '',
  ...props
}: ChipsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;
  const selectedArray = Array.isArray(selectedValue) ? selectedValue : [selectedValue].filter(Boolean);

  const updateValue = (newValue: string | string[]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };

  const handleChipClick = (optionValue: string) => {
    if (disabled) return;

    if (multiple) {
      const currentSelected = Array.isArray(selectedValue) ? selectedValue : [selectedValue].filter(Boolean);
      let newSelected: string[];
      
      if (currentSelected.includes(optionValue)) {
        newSelected = currentSelected.filter(v => v !== optionValue);
      } else {
        newSelected = [...currentSelected, optionValue];
      }
      
      updateValue(newSelected);
    } else {
      const newValue = selectedValue === optionValue ? '' : optionValue;
      updateValue(newValue);
    }
  };

  const isSelected = (optionValue: string) => {
    return selectedArray.includes(optionValue);
  };

  return (
    <div className={[
      'ticketbay-chips-container',
      disabled ? 'ticketbay-chips-container--disabled' : '',
      error ? 'ticketbay-chips-container--error' : '',
      className
    ].filter(Boolean).join(' ')} {...props}>
      {label && (
        <div className={[
          'ticketbay-chips-label',
          disabled ? 'ticketbay-chips-label--disabled' : '',
          error ? 'ticketbay-chips-label--error' : ''
        ].filter(Boolean).join(' ')}>
          {label}
          {required && <span className="ticketbay-chips-required">*</span>}
        </div>
      )}
      <div className={[
        'ticketbay-chips-group',
        `ticketbay-chips-group--${size}`
      ].filter(Boolean).join(' ')}>
        {options.map((option) => {
          const selected = isSelected(option.value);
          const chipDisabled = disabled || option.disabled;
          
          return (
            <button
              key={option.value}
              type="button"
              className={[
                'ticketbay-chip',
                `ticketbay-chip--${size}`,
                `ticketbay-chip--${variant}`,
                `ticketbay-chip--${color}`,
                selected ? 'ticketbay-chip--selected' : '',
                chipDisabled ? 'ticketbay-chip--disabled' : '',
                error ? 'ticketbay-chip--error' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => handleChipClick(option.value)}
              disabled={chipDisabled}
              aria-pressed={selected}
            >
              {option.icon && (
                <span className="ticketbay-chip-icon">
                  {option.icon}
                </span>
              )}
              <span className="ticketbay-chip-label">
                {option.label}
              </span>
              {selected && variant === 'filled' && (
                <span className="ticketbay-chip-check">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11.5 3.5L5.5 9.5L2.5 6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
      {helperText && (
        <div className={[
          'ticketbay-chips-helper',
          error ? 'ticketbay-chips-helper--error' : ''
        ].filter(Boolean).join(' ')}>
          {helperText}
        </div>
      )}
    </div>
  );
};