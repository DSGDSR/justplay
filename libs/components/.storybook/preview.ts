import './tailwind-imports.css';
import { withThemeByClassName } from '@storybook/addon-themes';

export default {
    decorators: [
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
        }),
    ],
    parameters: {
        viewport: {
            defaultViewport: 'reponsive',
        },
    },
};