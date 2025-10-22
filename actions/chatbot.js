"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generate a chat response from AI
 * @param {string} message - User message to the AI
 * @param {Array<{role: 'user'|'assistant', content: string}>} conversationHistory - Optional previous chat history
 * @returns {Promise<string>} - AI response text
 */
export const generateAIChatResponse = async (message, conversationHistory = []) => {
  const formattedHistory = conversationHistory
    .map((m) => `${m.role === "user" ? "User" : "AI"}: ${m.content}`)
    .join("\n");

  const prompt = `
    You are a helpful career AI chatbot. Respond to the user's message below in a friendly and concise manner.
    Maintain context from previous messages if provided.
    
    Conversation history:
    ${formattedHistory}

    User: ${message}
    
    IMPORTANT: Return ONLY the AI response text without extra formatting, markdown, or code blocks.
  `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:text)?\n?/g, "").trim();

  return cleanedText;
};

/**
 * Handle AI chat request for authenticated user
 * @param {string} message
 * @returns {Promise<{message: string, timestamp: string}>}
 */
export async function handleAIChat(message) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) throw new Error("User not found");

  // Optional: fetch previous chat history
  const history = await db.aiChat.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  const conversationHistory = history.map((h) => ({
    role: h.sender,
    content: h.message,
  }));

  // Generate AI response
  const aiResponse = await generateAIChatResponse(message, conversationHistory);

  // Save chat to database
  const chatEntry = await db.aiChat.create({
    data: {
      userId: user.id,
      message: aiResponse,
      sender: "assistant",
    },
  });

  return {
    message: aiResponse,
    timestamp: chatEntry.createdAt.toISOString(),
  };
}
