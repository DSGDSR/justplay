import type { Meta, StoryObj } from '@storybook/react';

import { Platforms } from '.'
import { getPlatformsMock } from '@wheretoplay/shared/testing';
import { TooltipProvider } from '../Tooltip';

const meta: Meta<typeof Platforms> = {
    component: Platforms,
    tags: ['autodocs'],
    title: 'Components/Platforms',
    args: {
        platforms: getPlatformsMock
    },
    decorators: [
        (Story) => (
            <TooltipProvider delayDuration={100}>
                <Story />
            </TooltipProvider>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof Platforms>;

export const Default: Story = {};

export const WithoutTooltip: Story = {
    args: {
        showTooltip: false
    }
};
