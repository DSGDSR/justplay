import type { Meta, StoryObj } from '@storybook/react';

import { Button, buttonVariants } from '.';
import Link from 'next/link';
import { IconSun } from '@tabler/icons-react';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonVariants: Story = {
  render() {
    return (
      <div className="flex gap-2">
        <Button variant={'default'}>Default</Button>
        <Button variant={'secondary'}>Secondary</Button>
        <Button variant={'destructive'}>Destructive</Button>
        <Button variant={'ghost'}>Ghost</Button>
        <Button variant={'link'}>Link</Button>
        <Button variant={'outline'}>Outline</Button>
      </div>
    );
  },
};

export const ButtonSizes: Story = {
  render() {
    return (
      <div className="flex gap-2">
        <Button size={'default'}>Default</Button>
        <Button size={'bubble'}>Bubble</Button>
        <Button size={'icon'}>
          <IconSun />
        </Button>
        <Button size={'sm'}>Small</Button>
        <Button size={'lg'}>Large</Button>
        <Button size={'xl'}>Extra large</Button>
      </div>
    );
  },
};

export const LinkButton: Story = {
  render() {
    return (
      <Link href={'#'} className={buttonVariants({ variant: 'default' })}>
        Click here
      </Link>
    );
  },
};
