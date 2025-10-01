import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Ticketbay/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['enabled', 'open', 'selected', 'error_empty', 'disabled'],
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: { 
    onChange: fn(),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Enabled: Story = {
  args: {
    state: 'enabled',
    placeholder: '선택해주세요',
    options: sampleOptions,
  },
};

export const Open: Story = {
  args: {
    state: 'open',
    placeholder: '선택해주세요',
    options: sampleOptions,
  },
};

export const Selected: Story = {
  args: {
    state: 'selected',
    placeholder: '선택해주세요',
    options: sampleOptions,
    value: 'apple',
  },
};

export const ErrorEmpty: Story = {
  args: {
    state: 'error_empty',
    placeholder: '선택해주세요',
    options: sampleOptions,
    error: '필수 항목입니다.',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    placeholder: '선택해주세요',
    options: sampleOptions,
  },
};

export const WithLabel: Story = {
  args: {
    state: 'enabled',
    label: '과일 선택',
    placeholder: '선택해주세요',
    options: sampleOptions,
  },
};

export const WithLabelRequired: Story = {
  args: {
    state: 'enabled',
    label: '과일 선택',
    placeholder: '선택해주세요',
    options: sampleOptions,
  },
};

export const MultipleSelection: Story = {
  args: {
    state: 'enabled',
    label: '여러 개 선택',
    placeholder: '선택해주세요',
    options: sampleOptions,
    multiple: true,
  },
};

export const MultipleSelectionWithValues: Story = {
  args: {
    state: 'selected',
    label: '여러 개 선택',
    placeholder: '선택해주세요',
    options: sampleOptions,
    multiple: true,
    value: ['apple', 'cherry'],
  },
};

export const LongOptions: Story = {
  args: {
    state: 'enabled',
    label: '긴 옵션 목록',
    placeholder: '선택해주세요',
    options: [
      { value: 'option1', label: '매우 긴 옵션 텍스트가 있는 첫 번째 항목' },
      { value: 'option2', label: '두 번째 옵션' },
      { value: 'option3', label: '세 번째 옵션' },
      { value: 'option4', label: '네 번째 옵션' },
      { value: 'option5', label: '다섯 번째 옵션' },
      { value: 'option6', label: '여섯 번째 옵션' },
      { value: 'option7', label: '일곱 번째 옵션' },
      { value: 'option8', label: '여덟 번째 옵션' },
      { value: 'option9', label: '아홉 번째 옵션' },
      { value: 'option10', label: '열 번째 옵션' },
    ],
  },
};