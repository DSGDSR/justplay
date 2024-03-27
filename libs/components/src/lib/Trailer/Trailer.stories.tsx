import type { Meta, StoryObj } from '@storybook/react';

import { Trailer } from '.';
import { TooltipProvider } from '../Tooltip';

const meta: Meta<typeof Trailer> = {
  component: Trailer,
  tags: ['autodocs'],
  title: 'Components/Trailer',
  args: {
    id: 'UzowO9v_-oc',
    name: 'Stardew Valley',
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Trailer>;

export const Default: Story = {};
