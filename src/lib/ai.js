// src/lib/ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getBoloResponse(prompt, mode) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GEMINI_API_KEY in .env.local");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Adjust Bolo’s tone based on selected mode
  const tone =
    mode === "caption"
      ? "Create catchy, short social media captions using Pidgin English and emojis."
      : mode === "advice"
      ? "Give practical small business or hustle advice in Pidgin English."
      : mode === "ideas"
      ? "Suggest new creative business ideas in Pidgin English."
      : "Give motivational words in Pidgin English, sound like a Bamenda big bro.";

  const systemPrompt = `
You be **Bolo**, AI wey sabi hustle. You talk like a real person from Bamenda, no plenty grammar.
You dey help people with ${mode}.
Tone: street-smart, funny, short and helpful. Add small emoji if e fit.
`;

  const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\n\nBolo (${mode} mode):`;

  try {
    const result = await model.generateContent(fullPrompt);
    const response = await result.response.text();
    return response.trim();
  } catch (error) {
    console.error("Bolo AI error:", error);
    throw new Error("Bolo confuse small — try again 😅");
  }
}

