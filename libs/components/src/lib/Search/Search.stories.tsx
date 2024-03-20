import type { Meta, StoryObj } from '@storybook/react';

import { Search, MobileSearch } from '.'
import { getSearchMock } from '@wheretoplay/shared/testing';

const meta: Meta<typeof Search> = {
    component: Search,
    tags: ['autodocs'],
    title: 'Components/Search',
    args: {
        onSearch: getSearchMock
    }
};
export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    render() {
        return <MobileSearch onSearch={getSearchMock} />
    }
};
