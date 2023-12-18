import { authMiddleware } from '@clerk/nextjs';
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: [
        // Public pages
        '/',
        '/game/(.*)',
        '/(.*)', // USER PAGES (RISKY)

        // Public API routes
        '/api/games/(.*)',
        '/api/twitch/(.*)',
        '/api/companies/(.*)',
        '/api/eshop/(.*)',
        '/api/hltb',
        '/api/lists',

        // Data routes
        '/data/eshop.json',

        // CMP
        '/cmp.js',

        // Clerk webhook
        '/api/clerk',
    ],
});
 
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};