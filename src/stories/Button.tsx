import './button.css';
import { colors } from './colors';
import type { ColorKey } from './colors';

export interface ButtonProps {
  /** Button style variant from Figma design system */
  style?: 'solid' | 'outline' | 'solid_text' | 'solid_badge' | 'outline_badge' | 'outline_icn' | 'sns';
  /** Button type variant from Figma design system */
  type?: 'primary' | 'secondary' | 'gray' | 'kakao' | 'other';
  /** Button size - focusing on large as per Figma mo/btn/large */
  size?: 'large';
  /** Button contents */
  label: string;
  /** Is the button disabled? */
  disabled?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Custom background color using color key from design system */
  colorKey?: ColorKey;
  /** Custom background color override (hex code) */
  backgroundColor?: string;
}

/** Ticketbay Button component based on Figma mo/btn/large design system */
export const Button = ({
  style = 'solid',
  type = 'primary',
  size = 'large',
  disabled = false,
  label,
  colorKey,
  backgroundColor,
  ...props
}: ButtonProps) => {
  const classes = [
    'ticketbay-button',
    `ticketbay-button--${style}`,
    `ticketbay-button--${type}`,
    `ticketbay-button--${size}`,
    disabled && 'ticketbay-button--disabled',
  ].filter(Boolean).join(' ');

  // Use colorKey from design system or custom backgroundColor
  const finalBackgroundColor = colorKey ? colors[colorKey] : backgroundColor;

  return (
    <button
      type="button"
      className={classes}
      style={{ backgroundColor: finalBackgroundColor }}
      disabled={disabled}
      {...props}
    >
      <span className="ticketbay-button__label">{label}</span>
    </button>
  );
};
