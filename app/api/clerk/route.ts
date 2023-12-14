import { HttpResponse } from '@/lib/utils';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@vercel/postgres';
import { headers } from 'next/headers'
import { Webhook } from 'svix';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

async function handleEvent(event: WebhookEvent) {
    const client = await db.connect()

    switch (event.type) {
        case 'user.created':
        client.query('INSERT INTO users (id, username) VALUES ($1, $2);', [
            event.data.id,
            event.data.username
        ]);
        break;

        case 'user.updated':
        client.query('UPDATE users SET username = $1 WHERE id = $2;', [
            event.data.username,
            event.data.id
        ]);
        break;

        case 'user.deleted':
        client.query('DELETE FROM users WHERE id = $1;', [
            event.data.id
        ]);
        break;

        default:
        break;
    }
}

export async function POST(request: Request) {
    try {
        const payload = await validateRequest(request);
        await handleEvent(payload);

        return HttpResponse(true)
    } catch (error) {
        return HttpResponse(null, false, {
            message: String(error),
            status: 500
        })
    }
}
