import type { Meta, StoryObj } from '@storybook/react';

import { ReadMore } from '.';

const meta: Meta<typeof ReadMore> = {
  component: ReadMore,
  tags: ['autodocs'],
  title: 'Components/ReadMore',
  args: {
    children:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio impedit earum aliquam culpa saepe nisi consequatur ex molestias harum delectus corporis id deserunt recusandae officia rerum, minus esse nobis. Minus?',
  },
};
export default meta;
type Story = StoryObj<typeof ReadMore>;

export const Default: Story = {};
