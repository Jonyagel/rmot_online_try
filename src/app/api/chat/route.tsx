// src/app/api/chat/route.tsx
import { NextResponse } from "next/server";
import { connectDb } from "../../db/connectDb";
import { ShopsModel } from "../../models/shopsModel";
import { NadlanModel } from "../../models/nadlanModel"; 
import { ForumModel } from "../../models/forumModel";
import mongoose from 'mongoose';

// Single global cache for trained system and conversations
const globalCache = {
  systemContext: '',
  lastInit: '',
  conversations: new Map<string, Array<{role: string, content: string}>>()
};

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();
    const now = new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' });

    // Initialize system once per day
    if (!globalCache.lastInit || !isSameDay(globalCache.lastInit, now)) {
      await connectDb();
      const businesses = await ShopsModel.find({}).lean().exec();

      // Set system context
      globalCache.systemContext = `אתה עוזר חרדי רמות. מידע עסקים:${businesses.map(b => 
        `\n${b.name}|${b._id}|${b.type}|${b.openingHours||'-'}`
      ).join('')}\nהוסף קישור: https://ramot-online-try.vercel.app/neighborhoodInfo?cardId=`;
      
      globalCache.lastInit = now;
      globalCache.conversations.clear();
    }

    // Get or initialize conversation
    let conversation = globalCache.conversations.get(userId) || [];
    
    // Add new message
    conversation.push({ role: 'user', content: message });

    // Keep conversation window small
    if (conversation.length > 4) {
      conversation = conversation.slice(-4);
    }

    // Send request with system context
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        // system: globalCache.systemContext,
        messages: conversation,
        max_tokens: 150
      })
    });

    if (!claudeResponse.ok) {
      throw new Error(`Claude API error: ${await claudeResponse.text()}`);
    }

    const data = await claudeResponse.json();
    
    // Save assistant's response
    conversation.push({ role: 'assistant', content: data.content[0].text });
    globalCache.conversations.set(userId, conversation);

    return NextResponse.json({ response: data.content[0].text });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'שגיאת מערכת, אנא נסה שוב' }, { status: 500 });
  }
}