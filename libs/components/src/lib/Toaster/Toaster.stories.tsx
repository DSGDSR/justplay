import type { Meta, StoryObj } from '@storybook/react';

import { Toaster } from '.';
import { useToast } from '@wheretoplay/shared/hooks';
import { Button } from '../Button';
import { useRef } from 'react';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  tags: ['autodocs'],
  title: 'Components/Toaster',
};
export default meta;
type Story = StoryObj<typeof Toaster>;

function DefaultStory() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { error, dismiss, info, toast, toasts } = useToast();

  return (
    <>
      <input
        className="border-2 px-3 py-2 w-96 block"
        defaultValue="Modify the toast message from this input"
        ref={inputRef}
      />

      <h2 className="mt-8 mb-2">Trigger toast:</h2>
      <div className="flex gap-3 mb-3">
        <Button variant={'outline'} onClick={() => toast(inputRef?.current?.value ?? '')}>
          Default
        </Button>
        <Button variant={'outline'} onClick={() => info(inputRef?.current?.value ?? '')}>
          Info
        </Button>
        <Button variant={'outline'} onClick={() => error(inputRef?.current?.value ?? '')}>
          Error
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant={'destructive'} onClick={() => toasts.forEach((t) => dismiss(t.id))}>
          Dismiss
        </Button>
      </div>

      <h2 className="mt-8 mb-2">Current toasts:</h2>
      <pre>{JSON.stringify(toasts, null, 2)}</pre>

      <Toaster />
    </>
  );
}

export const Default: Story = {
  render() {
    return <DefaultStory />;
  },
};
