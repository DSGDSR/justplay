import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, TooltipContent, TooltipTrigger } from '.'
import { TooltipProvider } from '../Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
    tags: ['autodocs'],
    title: 'Components/Tooltip',
    decorators: [
        (Story) => (
            <TooltipProvider delayDuration={100}>
                <Story />
            </TooltipProvider>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    render() {
        return <Tooltip>
            <TooltipTrigger asChild>
                <Button>Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Add to library</p>
            </TooltipContent>
        </Tooltip>
    }
};