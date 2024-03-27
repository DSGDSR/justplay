import type { Meta, StoryObj } from '@storybook/react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '.';
import { Kbd } from '../Kbd';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Components/Dialog',
  args: {
    defaultOpen: false,
  },
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <DialogTrigger asChild>
          <button>OPEN MODAL</button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog header</DialogTitle>
          </DialogHeader>
          Dialog content
        </DialogContent>
      </>
    ),
  },
};

export const NoHeader: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <DialogTrigger asChild>
          <button>OPEN MODAL</button>
        </DialogTrigger>
        <DialogContent>
          <main>
            <p>Dialog without header and nested component</p>
            <br />
            <Kbd keys={['Alt', 'C']} />
          </main>
        </DialogContent>
      </>
    ),
  },
};

export const DisableClickOutside: Story = {
  args: {
    defaultOpen: true,
    onOpenChange(open) {
      console.log(`onOpenChange => ${open}`);
    },
    children: (
      <>
        <DialogTrigger asChild>
          <button>OPEN MODAL</button>
        </DialogTrigger>
        <DialogContent
          onCloseAutoFocus={(e) => console.log(`onCloseAutoFocus => ${e}`)}
          onOpenAutoFocus={(e) => console.log(`onOpenAutoFocus => ${e}`)}
          onInteractOutside={(e) => {
            console.log(`onInteractOutside => ${e}`);
            e.preventDefault();
          }}
        >
          <main>
            <p>You want be able to close it by clicking outside &gt;:^D</p>
          </main>
        </DialogContent>
      </>
    ),
  },
};
