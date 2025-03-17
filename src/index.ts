/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Buffer } from 'node:buffer';
export interface Env {
    AI: Ai;
}
const URL = "https://pub-dbcf9f0bd3af47ca9d40971179ee62de.r2.dev/02f6edc0-1f7b-4272-bd17-f05335104725/audio.mp3";
export default {
    async fetch(request, env, ctx): Promise<Response> {
        const mp3 = await fetch(URL);
        if (!mp3.ok) {
          return Response.json({ error: `Failed to fetch MP3: ${mp3.status}` });
        }
        const mp3Buffer = await mp3.arrayBuffer();
        const base64 = Buffer.from(mp3Buffer, 'binary').toString("base64");
        try {
            const res = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {
                "audio": base64
            });
            return Response.json(res);
        }
        catch (e) {
            console.error(e);
            return Response.json({ error: "An unexpected error occurred" });
        }
    },
} satisfies ExportedHandler<Env>;
