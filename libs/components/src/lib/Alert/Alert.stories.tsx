import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertAction, AlertCancel, AlertContent, AlertDescription, AlertFooter, AlertHeader, AlertTitle, AlertTrigger } from '.'

const meta: Meta<typeof Alert> = {
    component: Alert,
    tags: ['autodocs'],
    title: 'Components/Alert',
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    render() {
        return <Alert>
            <AlertTrigger>Open</AlertTrigger>
            <AlertContent>
                <AlertHeader>
                    <AlertTitle>Are you absolutely sure ?</AlertTitle>
                    <AlertDescription>
                        This action cannot be undone.This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDescription>
                </AlertHeader>
                <AlertFooter>
                    <AlertCancel>Cancel</AlertCancel>
                    <AlertAction>Continue</AlertAction>
                </AlertFooter>
            </AlertContent>
        </Alert>
    }
};
