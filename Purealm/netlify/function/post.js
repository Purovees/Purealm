import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const store = getStore("posts");
  if (req.method === "POST") {
    const { content } = await req.json();
    // Save the post with a unique key (e.g., timestamp or uuid)
    await store.set(Date.now().toString(), content);
    return new Response("Post saved");
  } else if (req.method === "GET") {
    // Retrieve all posts
    const posts = await store.list();
    return new Response(JSON.stringify(posts));
  }
  return new Response("Method Not Allowed", { status: 405 });
};