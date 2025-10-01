import { useState, useRef, useEffect } from 'react';
import './dropdown.css';
import { colors } from './colors';
import type { ColorKey } from './colors';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  /** Dropdown state from Figma design system */
  state?: 'enabled' | 'open' | 'selected' | 'error_empty' | 'disabled';
  /** Dropdown size */
  size?: 'large' | 'medium';
  /** Dropdown type */
  type?: 'single' | 'multiple';
  /** Dropdown placeholder text */
  placeholder?: string;
  /** Dropdown label */
  label?: string;
  /** Available options */
  options?: DropdownOption[];
  /** Selected value(s) */
  value?: string | string[];
  /** Error message */
  error?: string;
  /** Is the dropdown disabled? */
  disabled?: boolean;
  /** Multiple selection allowed */
  multiple?: boolean;
  /** Optional change handler */
  onChange?: (value: string | string[]) => void;
  /** Optional focus handler */
  onFocus?: () => void;
  /** Optional blur handler */
  onBlur?: () => void;
  /** Custom border color using color key from design system */
  colorKey?: ColorKey;
  /** Custom border color override (hex code) */
  borderColor?: string;
}

/** Ticketbay Dropdown component based on Figma mo/dropdown/large design system */
export const Dropdown = ({
  state = 'enabled',
  size = 'large',
  type = 'single',
  placeholder = 'Select an option',
  label,
  options = [],
  value,
  error,
  disabled = false,
  multiple = false,
  onChange,
  onFocus,
  onBlur,
  colorKey,
  borderColor,
  ...props
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(state === 'open');
  const isMultiple = type === 'multiple' || multiple;
  const [selectedValues, setSelectedValues] = useState<string[]>(
    isMultiple 
      ? (Array.isArray(value) ? value : value ? [value] : [])
      : (value ? [value as string] : [])
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const containerClasses = [
    'ticketbay-dropdown-container',
    `ticketbay-dropdown-container--${size}`,
    `ticketbay-dropdown-container--${state}`,
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    'ticketbay-dropdown',
    `ticketbay-dropdown--${size}`,
    `ticketbay-dropdown--${state}`,
    isOpen && 'ticketbay-dropdown--open',
    disabled && 'ticketbay-dropdown--disabled',
  ].filter(Boolean).join(' ');

  // Use colorKey from design system or custom borderColor
  const finalBorderColor = colorKey ? colors[colorKey] : borderColor;

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      onFocus?.();
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    if (disabled) return;

    let newSelectedValues: string[];
    
    if (isMultiple) {
      if (selectedValues.includes(optionValue)) {
        newSelectedValues = selectedValues.filter(v => v !== optionValue);
      } else {
        newSelectedValues = [...selectedValues, optionValue];
      }
    } else {
      newSelectedValues = [optionValue];
      setIsOpen(false);
    }

    setSelectedValues(newSelectedValues);
    onChange?.(isMultiple ? newSelectedValues : newSelectedValues[0] || '');
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    
    if (isMultiple) {
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || selectedValues[0];
      }
      return `${selectedValues.length} items selected`;
    }
    
    const option = options.find(opt => opt.value === selectedValues[0]);
    return option?.label || selectedValues[0];
  };

  return (
    <div className={containerClasses} ref={dropdownRef}>
      {label && (
        <label className="ticketbay-dropdown__label">
          {label}
        </label>
      )}
      
      <div className="ticketbay-dropdown__wrapper">
        <button
          type="button"
          className={dropdownClasses}
          onClick={handleToggle}
          disabled={disabled}
          style={{ borderColor: finalBorderColor }}
          {...props}
        >
          <span className="ticketbay-dropdown__text">
            {getDisplayText()}
          </span>
          <span className={`ticketbay-dropdown__arrow ${isOpen ? 'ticketbay-dropdown__arrow--up' : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && !disabled && (
          <div className="ticketbay-dropdown__options">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`ticketbay-dropdown__option ${
                  selectedValues.includes(option.value) ? 'ticketbay-dropdown__option--selected' : ''
                } ${option.disabled ? 'ticketbay-dropdown__option--disabled' : ''}`}
                onClick={() => !option.disabled && handleOptionSelect(option.value)}
                disabled={option.disabled}
              >
                {isMultiple && (
                  <span className={`ticketbay-dropdown__checkbox ${
                    selectedValues.includes(option.value) ? 'ticketbay-dropdown__checkbox--checked' : ''
                  }`}>
                    {selectedValues.includes(option.value) ? '✓' : ''}
                  </span>
                )}
                <span className="ticketbay-dropdown__option-text">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="ticketbay-dropdown__message ticketbay-dropdown__message--error">
          {error}
        </div>
      )}
    </div>
  );
};