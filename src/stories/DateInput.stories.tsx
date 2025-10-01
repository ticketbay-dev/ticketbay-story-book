import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DateInput } from './DateInput';

const meta = {
  title: 'Ticketbay/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['enabled', 'selected', 'disabled'],
    },
    placeholder: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
  },
  args: { 
    onChange: fn(),
    onClick: fn(),
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    state: 'enabled',
    placeholder: 'YYYY.MM.DD',
  },
};

export const Selected: Story = {
  args: {
    state: 'selected',
    placeholder: 'YYYY.MM.DD',
    value: '2024.01.15',
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    placeholder: 'YYYY.MM.DD',
  },
};

export const WithLabel: Story = {
  args: {
    state: 'enabled',
    label: '날짜 선택',
    placeholder: 'YYYY.MM.DD',
  },
};

export const WithLabelRequired: Story = {
  args: {
    state: 'enabled',
    label: '날짜 선택',
    placeholder: 'YYYY.MM.DD',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    state: 'enabled',
    label: '날짜 선택',
    placeholder: 'YYYY.MM.DD',
    errorMessage: '올바른 날짜를 입력해주세요.',
  },
};

export const WithSelectedDate: Story = {
  args: {
    state: 'selected',
    label: '예약 날짜',
    placeholder: 'YYYY.MM.DD',
    value: '2024.12.25',
  },
};

export const DisabledWithLabel: Story = {
  args: {
    state: 'disabled',
    label: '날짜 선택',
    placeholder: 'YYYY.MM.DD',
    value: '2024.01.01',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    state: 'enabled',
    label: '생년월일',
    placeholder: '연도.월.일',
  },
};

export const LongLabel: Story = {
  args: {
    state: 'enabled',
    label: '항공편 출발 날짜를 선택해주세요',
    placeholder: 'YYYY.MM.DD',
    required: true,
  },
};