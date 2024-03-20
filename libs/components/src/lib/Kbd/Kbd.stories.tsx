import type { Meta, StoryObj } from '@storybook/react';

import { Kbd } from '.'
import { IconCommand } from '@tabler/icons-react';

const meta: Meta<typeof Kbd> = {
    component: Kbd,
    tags: ['autodocs'],
    title: 'Components/Kbd',
    argTypes: {
        keys: {
            description: 'List of keys, pass more than 1 for keys convination',
        }
    }
};
export default meta;
type Story = StoryObj<typeof Kbd>;

export const SingleKey: Story = {
    name: 'Single key',
    args: {
        keys: ['Alt']
    },
};

export const CombinedKeys: Story = {
    name: 'Combined keys',
    args: {
        keys: [<IconCommand size={14} className='-mx-0.5' />, 'K']
    },
};
