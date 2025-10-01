import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Input } from './Input';

// Ticketbay Input component based on Figma mo/input/text design system
const meta = {
  title: 'Ticketbay/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ticketbay Input component based on Figma mo/input/text design system with 11 different states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['empty', 'focus', 'writing', 'writen', 'writing_error', 'writen_successful', 'empty_error', 'disabled', 'disabled_medium', 'writen_error', 'writing_successful'],
      description: 'Input state variant from Figma design system'
    },
    size: {
      control: { type: 'select' },
      options: ['mobile'],
      description: 'Input size - currently supporting mobile as per mo/input/text'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type'
    },
    disabled: { 
      control: 'boolean',
      description: 'Disable the input'
    },
    colorKey: {
      control: { type: 'select' },
      options: ['ticket-magenta', 'red-6', 'green-6', 'gray-300', 'gray-400'],
      description: 'Border color from design system palette'
    },
    borderColor: { 
      control: 'color',
      description: 'Custom border color override (hex code)'
    },
  },
  args: { 
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// === Default Stories ===

export const Default: Story = {
  args: {
    state: 'empty',
    placeholder: 'Enter text here...',
    label: 'Input Label',
  },
};

// === All States Demo ===

export const AllStates: Story = {
  args: {
    placeholder: 'Placeholder text',
    label: 'Label',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '400px' }}>
      <h3>All Input States</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input state="empty" placeholder="Empty state" label="Empty" />
        <Input state="focus" placeholder="Focus state" label="Focus" />
        <Input state="writing" value="User is typing..." label="Writing" />
        <Input state="writen" value="Completed text input" label="Written" />
        <Input state="empty_error" placeholder="Empty with error" label="Empty Error" error="This field is required" />
        <Input state="writing_error" value="Invalid input..." label="Writing Error" error="Invalid format" />
        <Input state="writen_error" value="Wrong text input" label="Written Error" error="Please check your input" />
        <Input state="writing_successful" value="Valid input..." label="Writing Success" success="Looking good!" />
        <Input state="writen_successful" value="Perfect text input" label="Written Success" success="Input is valid" />
        <Input state="disabled" placeholder="Disabled state" label="Disabled" disabled />
        <Input state="disabled_medium" placeholder="Disabled medium" label="Disabled Medium" disabled />
      </div>
    </div>
  ),
};

// === Input Types Demo ===

export const InputTypes: Story = {
  args: {
    state: 'empty',
    label: 'Label',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '400px' }}>
      <h3>Different Input Types</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input type="text" placeholder="Text input" label="Text" />
        <Input type="email" placeholder="email@example.com" label="Email" />
        <Input type="password" placeholder="Password" label="Password" />
        <Input type="number" placeholder="123456" label="Number" />
        <Input type="tel" placeholder="010-1234-5678" label="Phone" />
        <Input type="url" placeholder="https://example.com" label="URL" />
        <Input type="search" placeholder="Search..." label="Search" />
      </div>
    </div>
  ),
};

// === States with Messages ===

export const StatesWithMessages: Story = {
  args: {
    label: 'Label',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '400px' }}>
      <h3>States with Messages</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input 
          state="empty_error" 
          placeholder="Required field" 
          label="Required Field" 
          error="This field is required" 
        />
        <Input 
          state="writing_error" 
          value="invalid@email" 
          label="Email Validation" 
          error="Please enter a valid email address" 
        />
        <Input 
          state="writen_error" 
          value="123" 
          label="Password Strength" 
          error="Password must be at least 8 characters" 
        />
        <Input 
          state="writing_successful" 
          value="user@example.com" 
          label="Email Address" 
          success="Email format is valid" 
        />
        <Input 
          state="writen_successful" 
          value="SecurePassword123!" 
          label="New Password" 
          success="Strong password" 
        />
      </div>
    </div>
  ),
};

// === Color Customization ===

export const ColorCustomization: Story = {
  args: {
    state: 'focus',
    placeholder: 'Custom colors',
    label: 'Custom Colors',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '400px' }}>
      <h3>Custom Colors</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input state="focus" placeholder="Ticket Magenta" label="Primary Color" colorKey="ticket-magenta" />
        <Input state="writing_error" placeholder="Red border" label="Error Color" colorKey="red-6" />
        <Input state="writing_successful" placeholder="Green border" label="Success Color" colorKey="green-6" />
        <Input state="focus" placeholder="Custom hex color" label="Custom Color" borderColor="#9c36b5" />
      </div>
    </div>
  ),
};

// === Individual State Stories ===

export const Empty: Story = {
  args: {
    state: 'empty',
    placeholder: 'Enter your text here...',
    label: 'Input Label',
  },
};

export const Focus: Story = {
  args: {
    state: 'focus',
    placeholder: 'Focused input',
    label: 'Focused Input',
  },
};

export const Writing: Story = {
  args: {
    state: 'writing',
    value: 'User is typing...',
    label: 'Writing State',
  },
};

export const Written: Story = {
  args: {
    state: 'writen',
    value: 'Completed input text',
    label: 'Completed Input',
  },
};

export const EmptyError: Story = {
  args: {
    state: 'empty_error',
    placeholder: 'This field is required',
    label: 'Required Field',
    error: 'This field is required',
  },
};

export const WritingError: Story = {
  args: {
    state: 'writing_error',
    value: 'invalid input...',
    label: 'Invalid Input',
    error: 'Please check your input format',
  },
};

export const WrittenError: Story = {
  args: {
    state: 'writen_error',
    value: 'Wrong input',
    label: 'Error State',
    error: 'Input validation failed',
  },
};

export const WritingSuccessful: Story = {
  args: {
    state: 'writing_successful',
    value: 'Valid input...',
    label: 'Valid Input',
    success: 'Input is being validated',
  },
};

export const WrittenSuccessful: Story = {
  args: {
    state: 'writen_successful',
    value: 'Perfect input',
    label: 'Success State',
    success: 'Input is valid and accepted',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    placeholder: 'Disabled input',
    label: 'Disabled Input',
    disabled: true,
  },
};

export const DisabledMedium: Story = {
  args: {
    state: 'disabled_medium',
    placeholder: 'Disabled medium state',
    label: 'Disabled Medium',
    disabled: true,
  },
};

// === Form Example ===

export const FormExample: Story = {
  args: {
    label: 'Form',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px', width: '400px' }}>
      <h3>Form Example</h3>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input 
          type="text" 
          placeholder="Enter your full name" 
          label="Full Name *" 
          state="empty"
        />
        <Input 
          type="email" 
          placeholder="your@email.com" 
          label="Email Address *" 
          state="writing"
          value="user@example"
        />
        <Input 
          type="password" 
          placeholder="Create a password" 
          label="Password *" 
          state="writing_error"
          value="123"
          error="Password must be at least 8 characters"
        />
        <Input 
          type="tel" 
          placeholder="010-1234-5678" 
          label="Phone Number" 
          state="writen_successful"
          value="010-1234-5678"
          success="Phone number is valid"
        />
      </form>
    </div>
  ),
};