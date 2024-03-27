import type { Meta, StoryObj } from '@storybook/react';
import { ClerkProvider } from '@clerk/nextjs';

import { Avatar } from '.';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Avatar',
  decorators: [
    (Story) => (
      <ClerkProvider>
        <Story />
      </ClerkProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};
