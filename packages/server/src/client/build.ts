export async function bundle(): Promise<string> {
    const build = await Bun.build({
        entrypoints: ['src/client/client.tsx']
    })

    return build.outputs[0].text();
}