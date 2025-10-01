import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button';

// Ticketbay Button component based on Figma mo/btn/large design system
const meta = {
  title: 'Ticketbay/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ticketbay Button component based on Figma mo/btn/large design system with 7 style variants and 5 type variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'solid_text', 'solid_badge', 'outline_badge', 'outline_icn', 'sns'],
      description: 'Button style variant from Figma design system'
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'gray', 'kakao', 'other'],
      description: 'Button type variant from Figma design system'
    },
    size: {
      control: { type: 'select' },
      options: ['large'],
      description: 'Button size - currently supporting large as per mo/btn/large'
    },
    disabled: { 
      control: 'boolean',
      description: 'Disable the button'
    },
    colorKey: {
      control: { type: 'select' },
      options: ['ticket-magenta', 'ticket-magenta-l', 'ticket-magenta-d', 'orange-6', 'orange-7', 'violet-6', 'violet-7', 'blue-6', 'blue-7', 'kakao', 'naver', 'gray-200', 'gray-600', 'gray-700'],
      description: 'Color from design system palette'
    },
    backgroundColor: { 
      control: 'color',
      description: 'Custom background color override (hex code)'
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// === Default Stories ===

export const Default: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Button',
  },
};

// === All Style Variants ===

export const AllStyles: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <h3>All Button Styles (Primary Type)</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button style="solid" type="primary" label="Solid" />
        <Button style="outline" type="primary" label="Outline" />
        <Button style="solid_text" type="primary" label="Text" />
        <Button style="solid_badge" type="primary" label="Badge" />
        <Button style="outline_badge" type="primary" label="Outline Badge" />
        <Button style="outline_icn" type="primary" label="Outline Icon" />
        <Button style="sns" type="kakao" label="SNS" />
      </div>
    </div>
  ),
};

// === All Type Variants ===

export const AllTypes: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <h3>All Button Types (Solid Style)</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button style="solid" type="primary" label="Primary" />
        <Button style="solid" type="secondary" label="Secondary" />
        <Button style="solid" type="gray" label="Gray" />
        <Button style="solid" type="kakao" label="Kakao" />
        <Button style="solid" type="other" label="Other" />
      </div>
    </div>
  ),
};

// === Style & Type Combinations ===

export const StyleTypeCombinations: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <div>
        <h3>Solid Buttons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button style="solid" type="primary" label="Primary" />
          <Button style="solid" type="secondary" label="Secondary" />
          <Button style="solid" type="gray" label="Gray" />
          <Button style="solid" type="kakao" label="Kakao" />
          <Button style="solid" type="other" label="Other" />
        </div>
      </div>

      <div>
        <h3>Outline Buttons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button style="outline" type="primary" label="Primary" />
          <Button style="outline" type="secondary" label="Secondary" />
          <Button style="outline" type="gray" label="Gray" />
          <Button style="outline" type="kakao" label="Kakao" />
          <Button style="outline" type="other" label="Other" />
        </div>
      </div>

      <div>
        <h3>Text Buttons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button style="solid_text" type="primary" label="Primary Text" />
          <Button style="solid_text" type="secondary" label="Secondary Text" />
        </div>
      </div>

      <div>
        <h3>Badge Buttons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button style="solid_badge" type="primary" label="Solid Badge" />
          <Button style="solid_badge" type="secondary" label="Secondary Badge" />
          <Button style="outline_badge" type="primary" label="Outline Badge" />
          <Button style="outline_badge" type="secondary" label="Secondary Outline" />
        </div>
      </div>

      <div>
        <h3>Icon & SNS Buttons</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button style="outline_icn" type="primary" label="Icon Button" />
          <Button style="outline_icn" type="secondary" label="Icon Secondary" />
          <Button style="sns" type="kakao" label="카카오 로그인" />
          <Button style="sns" type="other" label="페이스북 로그인" />
        </div>
      </div>
    </div>
  ),
};

// === Button States ===

export const ButtonStates: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <h3>Button States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button style="solid" type="primary" label="Normal" />
        <Button style="solid" type="primary" label="Disabled" disabled />
      </div>
    </div>
  ),
};

// === Individual Stories for Each Style ===

export const SolidPrimary: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Primary Button',
  },
};

export const OutlinePrimary: Story = {
  args: {
    style: 'outline',
    type: 'primary',
    label: 'Outline Button',
  },
};

export const TextPrimary: Story = {
  args: {
    style: 'solid_text',
    type: 'primary',
    label: 'Text Button',
  },
};

export const BadgePrimary: Story = {
  args: {
    style: 'solid_badge',
    type: 'primary',
    label: 'Badge',
  },
};

export const OutlineBadge: Story = {
  args: {
    style: 'outline_badge',
    type: 'primary',
    label: 'Outline Badge',
  },
};

export const IconButton: Story = {
  args: {
    style: 'outline_icn',
    type: 'primary',
    label: 'Icon Button',
  },
};

export const KakaoLogin: Story = {
  args: {
    style: 'sns',
    type: 'kakao',
    label: '카카오로 계속하기',
  },
};

export const FacebookLogin: Story = {
  args: {
    style: 'sns',
    type: 'other',
    label: 'Continue with Facebook',
  },
};

export const SecondaryButton: Story = {
  args: {
    style: 'solid',
    type: 'secondary',
    label: 'Secondary',
  },
};

export const GrayButton: Story = {
  args: {
    style: 'solid',
    type: 'gray',
    label: 'Gray Button',
  },
};

export const DisabledButton: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Disabled Button',
    disabled: true,
  },
};

export const CustomColorButton: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Custom Color',
    colorKey: 'ticket-magenta-l',
  },
};

export const ColorSystemDemo: Story = {
  args: {
    style: 'solid',
    type: 'primary',
    label: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <h3>Colors from Design System</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button style="solid" type="primary" label="ticket-magenta" colorKey="ticket-magenta" />
        <Button style="solid" type="primary" label="ticket-magenta-l" colorKey="ticket-magenta-l" />
        <Button style="solid" type="primary" label="ticket-magenta-d" colorKey="ticket-magenta-d" />
        <Button style="solid" type="primary" label="orange-6" colorKey="orange-6" />
        <Button style="solid" type="primary" label="violet-6" colorKey="violet-6" />
        <Button style="solid" type="primary" label="blue-6" colorKey="blue-6" />
        <Button style="solid" type="primary" label="kakao" colorKey="kakao" />
        <Button style="solid" type="primary" label="naver" colorKey="naver" />
      </div>
    </div>
  ),
};