import { Appearance } from '@clerk/types/dist/appearance'
import { dark } from '@clerk/themes'

export const clerkTheme: Appearance = {
    baseTheme: dark,
    variables: {
        colorBackground: 'hsl(222.2 47.4% 11.2%)',
        colorInputBackground: 'hsl(217.2 32.6% 17.5%)',
        colorTextOnPrimaryBackground: 'hsl(22.2 47.4% 11.2%)',
        colorPrimary: 'hsl(210 91.2% 59.8%)',
    }
}