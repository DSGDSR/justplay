export async function bundleClient(): Promise<void> {
    // Map all environment variables to make them available in the client
    const env: Record<string, string> = {}
    Object.keys(Bun.env).forEach((key, index) => env[`Bun.env.${key}`] = `'${Bun.env[key]}'`);

    Bun.build({
        entrypoints: ['./src/client/client.tsx'],
        outdir: './public',
        minify: true,
        sourcemap: Bun.env.SERVER_DEV_MODE ? 'inline' : 'none',
        define: env
    }).catch((err) => console.error(err))
} 