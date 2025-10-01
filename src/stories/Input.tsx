import './input.css';
import { colors } from './colors';
import type { ColorKey } from './colors';

export interface InputProps {
  /** Input state from Figma design system */
  state?: 'empty' | 'focus' | 'writing' | 'writen' | 'writing_error' | 'writen_successful' | 'empty_error' | 'disabled' | 'disabled_medium' | 'writen_error' | 'writing_successful';
  /** Input size - focusing on mobile as per Figma mo/input/text */
  size?: 'mobile';
  /** Input placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Is the input disabled? */
  disabled?: boolean;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Optional change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Optional blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom border color using color key from design system */
  colorKey?: ColorKey;
  /** Custom border color override (hex code) */
  borderColor?: string;
}

/** Ticketbay Input component based on Figma mo/input/text design system */
export const Input = ({
  state = 'empty',
  size = 'mobile',
  placeholder = '',
  value = '',
  label,
  error,
  success,
  disabled = false,
  type = 'text',
  onChange,
  onFocus,
  onBlur,
  colorKey,
  borderColor,
  ...props
}: InputProps) => {
  const containerClasses = [
    'ticketbay-input-container',
    `ticketbay-input-container--${size}`,
    `ticketbay-input-container--${state}`,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'ticketbay-input',
    `ticketbay-input--${size}`,
    `ticketbay-input--${state}`,
    disabled && 'ticketbay-input--disabled',
  ].filter(Boolean).join(' ');

  // Use colorKey from design system or custom borderColor
  const finalBorderColor = colorKey ? colors[colorKey] : borderColor;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="ticketbay-input__label">
          {label}
        </label>
      )}
      
      <div className="ticketbay-input__wrapper">
        <input
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{ borderColor: finalBorderColor }}
          {...props}
        />
      </div>

      {error && (
        <div className="ticketbay-input__message ticketbay-input__message--error">
          {error}
        </div>
      )}

      {success && (
        <div className="ticketbay-input__message ticketbay-input__message--success">
          {success}
        </div>
      )}
    </div>
  );
};