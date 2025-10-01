import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from './colors';

const ColorBox = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: value,
        border: '1px solid #ccc',
        marginRight: '8px',
      }}
    />
    <span style={{ fontWeight: 'bold', marginRight: '4px' }}>{name}:</span>
    <span>{value}</span>
  </div>
);

const meta: Meta<typeof ColorBox> = {
  title: 'Design/Colors',
  component: ColorBox,
};

export default meta;
type Story = StoryObj<typeof ColorBox>;

export const Palette: Story = {
  render: () => (
    <div>
      {Object.entries(colors).map(([name, value]) => (
        <ColorBox key={name} name={name} value={value} />
      ))}
    </div>
  ),
};
