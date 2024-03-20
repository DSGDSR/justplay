import type { Meta, StoryObj } from '@storybook/react';

import { Navbar } from '.'
import { getSearchMock } from '@wheretoplay/shared/testing';

const meta: Meta<typeof Navbar> = {
    component: Navbar,
    tags: ['autodocs'],
    title: 'Components/Navbar',
    args: {
        onSearch: getSearchMock
    }
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
    parameters: {
        layout: 'fullscreen'
    }
};

export const Mobile: Story = {
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'mobile1',
        },
    }
};
