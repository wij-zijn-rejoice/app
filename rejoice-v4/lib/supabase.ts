import { createBrowserClient } from "@supabase/ssr";

// Lazy client: GitHub Pages can build the app without Supabase variables.
// The browser creates the client only when the app actually uses Supabase.
let client: ReturnType<typeof createBrowserClient> | null = null;

function getClient() {
  if (typeof window === "undefined") {
    throw new Error("Supabase is only available in the browser.");
  }
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase-configuratie ontbreekt.");
    }
    client = createBrowserClient(url, key);
  }
  return client;
}

export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_target, property) {
    return Reflect.get(getClient(), property);
  },
});
