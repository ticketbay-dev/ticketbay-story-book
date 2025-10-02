import { useState } from 'react';
import './filter.css';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface FilterAnchorProps {
  /** Array of filter options */
  options: FilterOption[];
  /** Selected filter value(s) */
  value?: string | string[];
  /** Default selected value(s) for uncontrolled component */
  defaultValue?: string | string[];
  /** Allow multiple selection */
  multiple?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color variant using Ticketbay colors */
  color?: 'ticket-magenta' | 'blue-6' | 'green-6' | 'gray-600';
  /** Filter variant */
  variant?: 'tabs' | 'pills' | 'links';
  /** Show option counts */
  showCounts?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Scrollable on overflow */
  scrollable?: boolean;
  /** onChange callback */
  onChange?: (value: string | string[]) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Filter Anchor component for Ticketbay design system
 */
export const FilterAnchor = ({
  options,
  value: controlledValue,
  defaultValue = '',
  multiple = false,
  size = 'medium',
  color = 'ticket-magenta',
  variant = 'tabs',
  showCounts = true,
  disabled = false,
  scrollable = true,
  onChange,
  className = '',
  ...props
}: FilterAnchorProps) => {
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

  const handleFilterClick = (optionValue: string) => {
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
      'ticketbay-filter-container',
      `ticketbay-filter-container--${variant}`,
      disabled ? 'ticketbay-filter-container--disabled' : '',
      scrollable ? 'ticketbay-filter-container--scrollable' : '',
      className
    ].filter(Boolean).join(' ')} {...props}>
      <div className={[
        'ticketbay-filter-list',
        `ticketbay-filter-list--${variant}`,
        `ticketbay-filter-list--${size}`,
        scrollable ? 'ticketbay-filter-list--scrollable' : ''
      ].filter(Boolean).join(' ')}>
        {options.map((option) => {
          const selected = isSelected(option.value);
          const optionDisabled = disabled || option.disabled;
          
          return (
            <button
              key={option.value}
              type="button"
              className={[
                'ticketbay-filter-item',
                `ticketbay-filter-item--${variant}`,
                `ticketbay-filter-item--${size}`,
                `ticketbay-filter-item--${color}`,
                selected ? 'ticketbay-filter-item--selected' : '',
                optionDisabled ? 'ticketbay-filter-item--disabled' : ''
              ].filter(Boolean).join(' ')}
              onClick={() => handleFilterClick(option.value)}
              disabled={optionDisabled}
              aria-pressed={selected}
            >
              <span className="ticketbay-filter-label">
                {option.label}
              </span>
              {showCounts && option.count !== undefined && (
                <span className="ticketbay-filter-count">
                  {option.count}
                </span>
              )}
              {variant === 'tabs' && selected && (
                <div className="ticketbay-filter-indicator" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};