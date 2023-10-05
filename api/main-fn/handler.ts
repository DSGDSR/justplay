/**
 * This file is the entrypoint for all Vercel Functions.
 */

import { runServer } from '../../packages/server/src';

export const config = { runtime: 'edge' };

export default async function handler(request: Request) {
    console.log('a')
    return (await runServer()).fetch(request)
}