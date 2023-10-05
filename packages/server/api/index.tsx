/**
 * This file is the entrypoint for all Vercel Functions.
 */

import { runServer } from '../src';

export const config = { runtime: 'edge' };

export default async function handler(request: Request) {
  return (await runServer()).fetch(request);
}