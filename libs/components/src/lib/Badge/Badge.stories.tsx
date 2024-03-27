import type { Meta, StoryObj } from '@storybook/react';

import { Badge, badgeVariants } from '.';
import Link from 'next/link';

const meta: Meta<typeof Badge> = {
  component: Badge,
  tags: ['autodocs'],
  title: 'Components/Badge',
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const BadgeVariants: Story = {
  render() {
    return (
      <div className="flex gap-2">
        <Badge variant={'default'}>Default</Badge>
        <Badge variant={'secondary'}>Secondary</Badge>
        <Badge variant={'destructive'}>Destructive</Badge>
        <Badge variant={'outline'}>Outline</Badge>
        <Badge variant={'skeleton'}>Skeleton</Badge>
      </div>
    );
  },
};

export const LinkBadge: Story = {
  render() {
    return (
      <Link href={'#'} className={badgeVariants({ variant: 'secondary' })}>
        Badge
      </Link>
    );
  },
};
