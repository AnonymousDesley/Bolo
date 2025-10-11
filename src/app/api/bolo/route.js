// src/app/api/bolo/route.js
import { getBoloResponse } from "@/lib/ai";

export async function POST(req) {
  try {
    const { prompt, mode } = await req.json();
    const reply = await getBoloResponse(prompt, mode);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        reply: "😅 Bolo confuse small — try again.",
        error: err.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
