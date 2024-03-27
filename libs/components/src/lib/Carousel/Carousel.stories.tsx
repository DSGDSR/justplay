import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from '.';
import { mockScreenshot } from '@wheretoplay/shared/testing';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ['autodocs'],
  title: 'Components/Carousel',
  argTypes: {
    auto: {
      defaultValue: false,
      description: 'Enable auto scroll',
    },
    time: {
      defaultValue: 3,
      description: 'Seconds ellapsed between each auto scroll',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    screenshots: [
      mockScreenshot(),
      mockScreenshot({ width: 1280, height: 720 }),
      mockScreenshot({ width: 1440, height: 720 }),
    ],
    auto: false,
    time: 3,
  },
};

export const AutoScroll: Story = {
  name: 'Auto scroll',
  args: {
    ...Default.args,
    auto: true,
  },
};
