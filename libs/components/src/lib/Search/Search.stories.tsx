import type { Meta, StoryObj } from '@storybook/react';

import { Search, SearchMobile } from '.';
import { getSearchMock } from '@wheretoplay/shared/testing';

const meta: Meta<typeof Search> = {
  component: Search,
  tags: ['autodocs'],
  title: 'Components/Search',
  args: {
    onSearch: getSearchMock,
  },
};
export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render() {
    return (
      <div className="mt-3 px-2">
        <SearchMobile onSearch={getSearchMock} />
      </div>
    );
  },
};
