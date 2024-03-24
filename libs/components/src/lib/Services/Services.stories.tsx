import type { Meta, StoryObj } from '@storybook/react';

import { Services } from '.'
import { getServicesMock } from '@wheretoplay/shared/testing';
import { TooltipProvider } from '../Tooltip';
import { useServices } from '@wheretoplay/shared/hooks';

const meta: Meta<typeof Services> = {
    component: Services,
    tags: ['autodocs'],
    title: 'Components/Services',
    decorators: [
        (Story) => (
            <TooltipProvider delayDuration={100} >
                <Story />
            </TooltipProvider>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof Services>;

export const Default: Story = {
    render() {
        const refinedServices = useServices(getServicesMock)

        return refinedServices ? <Services services={refinedServices} /> : <></>
    }
};
